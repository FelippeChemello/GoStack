import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Expose({ name: 'avatarUrl' })
    getAvatarUrl(): string {
        const fallbackUrl = `https://ui-avatars.com/api/?background=random&name=${this.name.replace(
            ' ',
            '-',
        )}`;

        if (!this.avatar) {
            return fallbackUrl;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${this.avatar}`;
            default:
                return fallbackUrl;
        }
    }
}

export default User;
