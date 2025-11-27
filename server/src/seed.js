const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany({});
  await prisma.employee.deleteMany({});

  const mani = await prisma.employee.create({ data: { name: 'Mani Kanta Reddy', role: 'Intern' } });
  const alice = await prisma.employee.create({ data: { name: 'Alice Johnson', role: 'Manager' } });
  const bob = await prisma.employee.create({ data: { name: 'Bob Smith', role: 'Developer' } });

  await prisma.task.createMany({
    data: [
      { title: 'Know about company', employeeId: mani.id, status: 'Completed' },
      { title: 'Implement login feature', employeeId: bob.id, status: 'Pending' },
      { title: 'Prepare project report', employeeId: alice.id, status: 'In Progress' },
    ],
  });

  console.log('Database seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
