# Cadastro de Usuário

- Criação da tabela
- Criação do Model `User`

## Relacionamentos

- Para criar um relacionamento utiliza-se um objeto da classe `TableForeignKey`
  - Devemos informar obrigatóriamente
    - nome da coluna da tabela onde terá a chave estrangeira
    - Nome da coluna da tabela referenciada
    - Nome da tabela referenciada
  - Opcionalmente pode-se adicionar
    - `onDelete` o qual, ao ser removido o relacionamento, realizará uma alteração também neste registro
      - Possibilidades de `onDelete`
        - `RESTRICT`: Não permite que seja deletado se o relacionamento existir
        - `SET NULL`: Define o registro da tabela da chave estrangeira como `null`
        - `CASCADE`: Deleta tudo que está relacionado
    - `onUpdate` o qual, quando a coluna relacionada for alterada (da outra tabela), fará alteração na coluna que possui o relacionamento (da tabela atual onde está criando o relacionamento)
      - Recomenda-se utilizar `CASCADE` para que seja atualizado o registro relacionado também
  ```typescript
    queryRunner.createForeignKey(
        'appointments',
        new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['providerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
    )
  ```
- Para definirmos o relacionamento no `Model`
  - Devemos importar o Modelo relacionado no modelo que relacionou (que corresponde a tabela que possui a chave estrangeira)
  - Neste modelo devemos criar um atributo do tipo do modelo relacionado
  - Definir sobre este atributo o tipo de relacionamento
    - Um para Um (OneToOne)
    - Um para Muitos (OneToMany)
    - Muitos para Muitos (ManyToMany)
    - Valido vice-versa, sempre pensando partindo do objeto atual para o objeto relacionado
  - Informar no tipo de relacionamento um *arrowFunction* devolvendo o modelo relacionado
  - Informar através do `JoinColumn` o nome do atributo que represeta a chave estrangeira
  ```typescript
    class Appointment {
        @PrimaryGeneratedColumn('uuid')
        id: string;

        @Column()
        providerId: string;

        @ManyToOne(() => User)
        @JoinColumn({ name: 'providerId' })
        provider: User;
    }
  ```

## Aplicação para criar usuários

- Não há a necessidade de criar um repositório, visto que não teremos nenhum método de consulta ao banco diferente dos já fornecidos pelo TypeORM

### Criptografia da Senha

- Utilizaremos a dependencia `bcryptjs`
    ```bash
    yarn add bcryptjs
    yarn add -D @types/bcryptjs
    ```
