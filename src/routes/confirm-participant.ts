import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { env } from "../env";

export async function confirmParticipants(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId/confirm', {
        schema: {
            params: z.object({
                participantId: z.string().uuid(),
            })
        },
    }, async (request, reply) => {
        const { participantId } = request.params;

        console.log('Received participantId:', participantId);

        try {
            const participant = await prisma.participant.findUnique({
                where: {
                    id: participantId,
                }
            });

            console.log('Participant from DB:', participant);

            if (!participant) {
                console.log('Participant not found for ID:', participantId);
                return reply.status(404).send({ 
                    statusCode: 404,
                    error: 'Not Found',
                    message: 'Participant not found.'
                });
            }

            if (participant.is_confirmed) {
                console.log('Participant already confirmed:', participant);
                return reply.redirect(`${env.WEB_BASE_URL}/trips/${participant.trip_id}`);
            }

            await prisma.participant.update({
                where: {
                    id: participantId
                },
                data: { is_confirmed: true }
            });

            console.log('Participant confirmed:', participant);

            return reply.redirect(`${env.WEB_BASE_URL}/trips/${participant.trip_id}`);
        } catch (error) {
            console.error('Error during participant confirmation:', error);
            return reply.status(500).send({ 
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'An error occurred while confirming the participant.'
            });
        }
    });
}
