import postgres from "postgres";

export const executarSQL = async (comandoSQL) => {
    try {
        const conexao = postgres('postgresql://neondb_owner:npg_YICDMtFk8d2B@ep-fancy-scene-ah4eukqa-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

        const result = await conexao.unsafe(comandoSQL);
        conexao.CLOSE;
        return result;
        
    } catch (error) {
        return error.message;
    }
}