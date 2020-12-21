import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';

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

import { useAuth } from '../../hooks/AuthContext';
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
        avatarUrl: string;
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
            if (modifiers.available && !modifiers.disabled) {
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
                    ...appointment,
                    hourAsText: format(parseISO(appointment.date), 'HH:mm'),
                } as Appointment;
            });

            console.log(appointmentsFormatted);
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

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment =>
            isAfter(parseISO(appointment.date), new Date()),
        );
    }, [appointments]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatarUrl} alt={user.name} />

                        <div>
                            <span> Bem-vindo, </span>
                            <Link to="/profile">
                                <strong> {user.name} </strong>
                            </Link>
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

                    {isToday(selectedDate) && nextAppointment && (
                        <NextAppointment>
                            <strong>Agendamento a seguir</strong>

                            <div>
                                <img
                                    src={nextAppointment.user.avatarUrl}
                                    alt={nextAppointment.user.name}
                                />

                                <strong>{nextAppointment.user.name}</strong>
                                <span>
                                    <FiClock />
                                    {nextAppointment.hourAsText}
                                </span>
                            </div>
                        </NextAppointment>
                    )}

                    <Section>
                        <strong>Manhã</strong>

                        {morningAppointments.length === 0 && (
                            <p> Nenhum agendamento para este período</p>
                        )}

                        {morningAppointments.map(appointment => {
                            console.log(appointment);
                            return (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock /> {appointment.hourAsText}
                                    </span>

                                    <div>
                                        <img
                                            src={appointment.user.avatarUrl}
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

                        {afternoonAppointments.length === 0 && (
                            <p> Nenhum agendamento para este período</p>
                        )}

                        {afternoonAppointments.map(appointment => {
                            return (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock /> {appointment.hourAsText}
                                    </span>

                                    <div>
                                        <img
                                            src={appointment.user.avatarUrl}
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
