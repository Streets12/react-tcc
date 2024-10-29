import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma =  new PrismaClient()

const app = express();
app.use (express.json())


app.post('/usuarios', async (req, res) => {
    const{ nome,email,senha } = req.body;
    
    try{ 
        const novoUsuario = await prisma.Usuario.create({
        data:{
            nome, 
            email,     
            senha  
        }
    })

    res.status(201).json('Ok, deu certo');
}catch(error){
    res.status(400).json({error: 'Erro ao cadastrar usuarios'});
}
});


app.listen(3000), ()=>{
    console.log('Servidor rodando na porta 3000');
};



/*      1. tipo de rota/ metodo HTTP
        2. endereço 
*/

//nome,senha, email,
//foto perfil
//emocoes 
// 