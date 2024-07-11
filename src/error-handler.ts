import { FastifyInstance } from "fastify"
import { CLientError } from "./errors/client-error"
import { ZodError } from "zod"

type fastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: fastifyErrorHandler = (error, request, reply) => {

    if(error instanceof ZodError){
        return reply.status(400).send({
            message: 'Invalid input',
            errors: error.flatten().fieldErrors
        })
    }

    if(error instanceof CLientError){
        return reply.status(400).send({
            message: error.message
        })
    }
    return reply.status(500).send({message: 'Internet server error'})

}