import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export type Usuario = {
    id : number;
    nome : string;
    email : string;
}

export async function listarUsuarios(): Promise<Usuario[]> {
    const resultado = await pool.query<Usuario>(
        "SELECT id, nome, email FROM usuarios ORDER BY id"
    )
    return resultado.rows;
}

export async function criarUsuario(nome:string,email:string):Promise<Usuario>{
    const resultado = await pool.query<Usuario>(
        `
        INSERT INTO Usuarios (nome,email)
        VALUES ($1,$2)
        RETURNING id,nome,email
        `,[nome,email]
    )
    const usuario = resultado.rows[0];

    if(!usuario){
        throw new Error("Falha ao criar usuário");
        
    }
    return usuario;
};