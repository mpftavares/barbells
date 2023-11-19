const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const defaultExercises = [
        {
            name: 'squat',
            equipment: 'barbell',
            targetMuscles: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'glutes' },
                ],
            },
        },
        {
            name: 'bulgarian split squat',
            equipment: 'dumbells',
            unilateral: true,
            targetMuscles: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            name: 'leg press',
            equipment: 'machine',
            targetMuscles: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'glutes' },
                    { muscle: 'quadriceps' },
                    { muscle: 'calfs' },
                ],
            },
        },
        {
            name: 'leg extension',
            equipment: 'machine',
            targetMuscles: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'quadriceps' },
                ],
            },
        },
        {
            name: 'leg curl',
            equipment: 'machine',
            targetMuscles: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            name: 'deadlift',
            equipment: 'barbell',
            targetMuscles: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            name: 'romanian deadlift',
            equipment: 'barbell',
            targetMuscles: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            name: 'bench press',
            equipment: 'barbell',
            targetMuscles: {
                create: [
                    { muscle: 'chest' },
                    { muscle: 'shoulders' },
                    { muscle: 'triceps' },
                ],
            },
        },
        {
            name: 'incline bench press',
            equipment: 'dumbells',
            targetMuscles: {
                create: [
                    { muscle: 'chest' },
                    { muscle: 'shoulders' },
                    { muscle: 'triceps' },
                ],
            },
        },
        {
            name: 'overhead press',
            equipment: 'barbell',
            targetMuscles: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            name: 'shoulder press',
            equipment: 'dumbells',
            targetMuscles: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            name: 'lateral raise',
            equipment: 'dumbells',
            targetMuscles: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            name: 'barbell row',
            equipment: 'barbell',
            targetMuscles: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            name: 'lat pulldown',
            equipment: 'cable',
            targetMuscles: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            name: 'pull-up',
            equipment: 'bodyweight',
            targetMuscles: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            name: 'chin-up',
            equipment: 'bodyweight',
            targetMuscles: {
                create: [
                    { muscle: 'back' },
                    { muscle: 'biceps' },
                ],
            },
        },
        {
            name: 'bicep curl',
            equipment: 'dumbells',
            targetMuscles: {
                create: [
                    { muscle: 'biceps' },
                ],
            },
        }
    ];

    for (const exercise of defaultExercises) {
        await prisma.exercise.create({
            data: exercise,
        });
    }

    console.log('Default exercises seeded successfully 💪');
}

main()
    .catch((error) => {
        console.error('Error seeding default exercises:', error, '👺');
    })
    .finally(async () => {
        await prisma.$disconnect();
    });