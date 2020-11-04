import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alertSvg from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
    file: File;
    name: string;
    readableSize: string;
}

const Import: React.FC = () => {
    const [uploadedFile, setUploadedFile] = useState<FileProps>();
    const history = useHistory();

    async function handleUpload(): Promise<void> {
        if (!uploadedFile) {
            alert('Selecione um arquivo para enviar');
            return;
        }

        const formData = new FormData();

        formData.append('file', uploadedFile.file);

        try {
            await api.post('/transactions/import', formData);
            alert('Envio realizado com sucesso');
            history.push('/');
        } catch (err) {
            console.log(err.response.error);
        }
    }

    function submitFile(file: File[]): void {
        console.log(file[0]);

        if (file.length > 1) {
            alert('Envio permitido de apenas um arquivo por vez');
            return;
        }

        if (file[0].type != 'text/csv') {
            alert('Tipo de arquivo inválido!');
            return;
        }

        setUploadedFile({
            file: file[0],
            name: file[0].name,
            readableSize: filesize(file[0].size),
        });
    }

    return (
        <>
            <Header size="small" />
            <Container>
                <Title>Importar uma transação</Title>
                <ImportFileContainer>
                    <Upload onUpload={submitFile} />
                    {!!uploadedFile && <FileList files={[uploadedFile]} />}

                    <Footer>
                        <p>
                            <img src={alertSvg} alt="Alert" />
                            Permitido apenas arquivos CSV
                        </p>
                        <button onClick={handleUpload} type="button">
                            Enviar
                        </button>
                    </Footer>
                </ImportFileContainer>
            </Container>
        </>
    );
};

export default Import;
