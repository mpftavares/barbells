const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const defaultExercises = [
        {
            id: "1",
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
            id: "2",
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
            id: "3",
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
            id: "4",
            name: 'leg extension',
            equipment: 'machine',
            targets: {
                create: [
                    { muscle: 'quadriceps' },
                ],
            },
        },
        {
            id: "5",
            name: 'leg curl',
            equipment: 'machine',
            targets: {
                create: [
                    { muscle: 'hamstrings' },
                ],
            },
        },
        {
            id: "6",
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
            id: "7",
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
            id: "8",
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
            id: "9",
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
            id: "10",
            name: 'overhead press',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            id: "11",
            name: 'shoulder press',
            equipment: 'dumbbells',
            targets: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            id: "12",
            name: 'lateral raise',
            equipment: 'dumbbells',
            targets: {
                create: [
                    { muscle: 'shoulders' },
                ],
            },
        },
        {
            id: "13",
            name: 'barbell row',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            id: "14",
            name: 'lat pulldown',
            equipment: 'cable',
            targets: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            id: "15",
            name: 'pull-up',
            equipment: 'bodyweight',
            targets: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            id: "16",
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
            id: "17",
            name: 'bicep curl',
            equipment: 'dumbbells',
            unilateral: true,
            targets: {
                create: [
                    { muscle: 'biceps' },
                ],
            },
        },
        {
            id: "18",
            name: 'abductor',
            equipment: 'machine',
            targets: {
                create: [
                    { muscle: 'glutes' },
                ],
            },
        },
        {
            id: "19",
            name: 'unilateral dumbbell row',
            equipment: 'dumbbells',
            unilateral: true,
            targets: {
                create: [
                    { muscle: 'back' },
                ],
            },
        },
        {
            id: "20",
            name: 'bicep curl',
            equipment: 'barbell',
            targets: {
                create: [
                    { muscle: 'biceps' },
                ],
            },
        },
    ];

    for (const exercise of defaultExercises) {
        await prisma.exercise.create({
            data: exercise,
        });
    }

    console.log('Default exercises seeded successfully 💪');

    const defaultTemplates = [
        {
            name: 'lower body',
            schemas: {
                create: [
                    { exerciseId: "1", number: 1, sets: 3, reps: '8-12' },
                    { exerciseId: "4", number: 2, sets: 3, reps: '8-12' },
                    { exerciseId: "5", number: 3, sets: 3, reps: '8-12' },
                    { exerciseId: "2", number: 4, sets: 3, reps: '8-12' },
                    { exerciseId: "18", number: 5, sets: 3, reps: '8-12' },
                ]
            }
        },
        {
            name: 'back and biceps',
            schemas: {
                create: [
                    { exerciseId: "14", number: 1, sets: 3, reps: '8-12' },
                    { exerciseId: "13", number: 2, sets: 3, reps: '8-12' },
                    { exerciseId: "19", number: 3, sets: 3, reps: '8-12' },
                    { exerciseId: "20", number: 4, sets: 3, reps: '8-12' },
                    { exerciseId: "17", number: 5, sets: 3, reps: '8-12' },
                ]
            }
        },
        {
            name: 'chest and shoulders',
            schemas: {
                create: [
                    { exerciseId: "8", number: 1, sets: 3, reps: '8-12' },
                    { exerciseId: "9", number: 2, sets: 3, reps: '8-12' },
                    { exerciseId: "10", number: 3, sets: 3, reps: '8-12' },
                    { exerciseId: "11", number: 4, sets: 3, reps: '8-12' },
                    { exerciseId: "12", number: 5, sets: 3, reps: '8-12' },
                ]
            }
        }
    ]

    for (const template of defaultTemplates) {
        await prisma.template.create({
            data: template,
        });
    }

    console.log('Default templates seeded successfully 💪');
}

main()
    .catch((error) => {
        console.error('Error seeding default exercises:', error, '👺');
    })
    .finally(async () => {
        await prisma.$disconnect();
    });