export class User {
    private usrId: number;
    private usrNome: string;
    private usrEmail: string;
    private usrIdade: number;

    constructor(id: number, nome:string, email:string, idade: number) {
        this.usrId = id;
        this.usrEmail = email;
        this.usrIdade = idade;
        this.usrNome = nome;
    }

    public get id(): number {
        return this.usrId;
    }
    public set id(value: number) {
        this.usrId = value;
    }
    public get nome(): string {
        return this.usrNome;
    }
    public set nome(value: string) {
        this.usrNome = value;
    }
    public get email(): string {
        return this.usrEmail;
    }
    public set email(value: string) {
        this.usrEmail = value;
    }
    public get idade(): number {
        return this.usrIdade;
    }
    public set idade(value: number) {
        this.usrIdade = value;
    }
}

export let usuarios: User[] = [];