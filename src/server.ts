import { createServer, IncomingMessage, ServerResponse } from "node:http";
import {readFile} from "node:fs/promises";
import {join} from "node:path";

import { criarUsuario , listarUsuarios } from "./db";

const PORT = Number(process.env.PORT ?? 3000);

type CorpoCadastro = {
    nome?: unknown;
    email?: unknown;
};

function responderJson(
    res: ServerResponse,
    status: number,
    dados: unknown
): void {

    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8"
    });

    res.end(JSON.stringify(dados));
}

async function lerJson(
    req: IncomingMessage
): Promise<unknown> {

    let corpo = "";

    for await (const pedaco of req) {
        corpo += pedaco;
    }

    if (!corpo) {
        return {};
    }

    return JSON.parse(corpo);
}

const server = createServer(async (req, res) => {

    try {

        const metodo = req.method ?? "GET";
        const url = req.url ?? "/";

        console.log(`${metodo} ${url}`);



        if (metodo === "GET" && url === "/") {

            const caminhoHtml = join(
                process.cwd(),
                "public",
                "index.html"
            );

            const html = await readFile(
                caminhoHtml,
                "utf8"
            );

            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            res.end(html);

            return;
        }



        if (
            metodo === "GET" &&
            url === "/api/usuarios"
        ) {

            const usuarios =
                await listarUsuarios();

            responderJson(
                res,
                200,
                usuarios
            );

            return;
        }



        if (
            metodo === "POST" &&
            url === "/api/usuarios"
        ) {

            const corpo =
                await lerJson(req) as CorpoCadastro;

            if (
                typeof corpo.nome !== "string" ||
                typeof corpo.email !== "string"
            ) {

                responderJson(
                    res,
                    400,
                    {
                        erro:
                            "Nome e e-mail são obrigatórios."
                    }
                );

                return;
            }



            const nome = corpo.nome.trim();
            const email = corpo.email
                .trim()
                .toLowerCase();



            if (!nome || !email) {

                responderJson(
                    res,
                    400,
                    {
                        erro:
                            "Nome e e-mail não podem estar vazios."
                    }
                );

                return;
            }



            const usuario =
                await criarUsuario(
                    nome,
                    email
                );

            responderJson(
                res,
                201,
                usuario
            );

            return;
        }



        responderJson(
            res,
            404,
            {
                erro: "Rota não encontrada."
            }
        );

    } catch (erro) {

        console.error(erro);

        responderJson(
            res,
            500,
            {
                erro:
                    "Erro interno do servidor."
            }
        );
    }
});

server.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

});