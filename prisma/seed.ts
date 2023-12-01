const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const defaultExercises = [
        {
            name: 'squat',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'quadriceps' },
                    { muscle: 'glutes' },
                ],
            },
        },
        {
            name: 'bulgarian split squat',
            equipment: 'dumbbells',
            unilateral: true,
            targets: {
                create: [
                    { muscle: 'glutes' },
                    { muscle: 'quadriceps' },
                ],
            },
        },
        {
            name: 'leg press',
            equipment: 'machine',
            targets: {
                create: [
                    { muscle: 'glutes' },
                    { muscle: 'quadriceps' },
                    { muscle: 'calfs' },
                ],
            },
        },
        {
            name: 'leg extension',
            equipment: 'machine',
            targets: {
                create: [
                    { muscle: 'quadriceps' },
                ],
            },
        },
        {
            name: 'leg curl',
            equipment: 'machine',
            targets: {
                create: [
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            name: 'deadlift',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'quadriceps' },
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            name: 'romanian deadlift',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            name: 'bench press',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'chest' },
                    { muscle: 'shoulders' },
                    { muscle: 'triceps' },
                ],
            },
        },
        {
            name: 'incline bench press',
            equipment: 'dumbbells',
            targets: {
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
            targets: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            name: 'shoulder press',
            equipment: 'dumbbells',
            targets: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            name: 'lateral raise',
            equipment: 'dumbbells',
            targets: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            name: 'barbell row',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            name: 'lat pulldown',
            equipment: 'cable',
            targets: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            name: 'pull-up',
            equipment: 'bodyweight',
            targets: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            name: 'chin-up',
            equipment: 'bodyweight',
            targets: {
                create: [
                    { muscle: 'back' },
                    { muscle: 'biceps' },
                ],
            },
        },
        {
            name: 'bicep curl',
            equipment: 'dumbbells',
            targets: {
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