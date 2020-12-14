import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    NextAppointment,
    Section,
    Appointment,
    Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

type MonthAvailabilityItem = {
    day: number;
    available: boolean;
};

interface Appointment {
    id: string;
    date: string;
    hourAsText: string;
    user: {
        name: string;
        avartUrl?: string;
    };
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<
        MonthAvailabilityItem[]
    >([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const handleDateChange = useCallback(
        (day: Date, modifiers: DayModifiers) => {
            if (modifiers.available) {
                setSelectedDate(day);
            }
        },
        [],
    );

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            },
        }).then(response => setMonthAvailability(response.data));
    }, [currentMonth, user.id]);

    useEffect(() => {
        api.get<Appointment[]>(`/appointments/me`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            },
        }).then(response => {
            const appointmentsFormatted = response.data.map(appointment => {
                return {
                    id: appointment.id,
                    date: appointment.date,
                    hourAsText: format(parseISO(appointment.date), 'HH:mm'),
                    user: {
                        name: appointment.user.name,
                        avartUrl:
                            appointment.user.avartUrl ||
                            `https://ui-avatars.com/api/?background=random&name=${appointment.user.name.replace(
                                ' ',
                                '-',
                            )}`,
                    },
                } as Appointment;
            });

            setAppointments(appointmentsFormatted);
        });
    }, [selectedDate]);

    const disabledDays = useMemo(
        () =>
            monthAvailability
                .filter(day => !day.available)
                .map(
                    day =>
                        new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            day.day,
                        ),
                ),
        [currentMonth, monthAvailability],
    );

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', { locale: ptBR });
    }, [selectedDate]);

    const morningAppointments = useMemo(
        () =>
            appointments.filter(
                appointment => parseISO(appointment.date).getHours() < 12,
            ),
        [appointments],
    );

    const afternoonAppointments = useMemo(
        () =>
            appointments.filter(
                appointment => parseISO(appointment.date).getHours() >= 12,
            ),
        [appointments],
    );

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatarUrl} alt={user.name} />

                        <div>
                            <span> Bem-vindo, </span>
                            <strong> {user.name} </strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        {isToday(selectedDate) && <span>hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>

                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>

                        <div>
                            <img src={user.avatarUrl} alt={user.name} />

                            <strong>{user.name}</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointment>

                    <Section>
                        <strong>Manhã</strong>

                        {morningAppointments.map(appointment => {
                            return (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock /> {appointment.hourAsText}
                                    </span>

                                    <div>
                                        <img
                                            src={appointment.user.avartUrl}
                                            alt={appointment.user.name}
                                        />

                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            );
                        })}
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        {afternoonAppointments.map(appointment => {
                            return (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock /> {appointment.hourAsText}
                                    </span>

                                    <div>
                                        <img
                                            src={appointment.user.avartUrl}
                                            alt={appointment.user.name}
                                        />

                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            );
                        })}
                    </Section>
                </Schedule>

                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[
                            ...disabledDays,
                            {
                                daysOfWeek: [0, 6],
                            },
                        ]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                        onDayClick={handleDateChange}
                        selectedDays={selectedDate}
                        onMonthChange={handleMonthChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;
