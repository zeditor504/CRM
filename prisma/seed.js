const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'crmdev786@gmail.com';

async function seedBaselineAdministrator() {
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      role: 'OWNER',
      is_active: true
    },
    create: {
      email: ADMIN_EMAIL,
      first_name: 'Baseline',
      last_name: 'Administrator',
      password_hash: 'change-me',
      role: 'OWNER',
      is_active: true
    }
  });
}

async function main() {
  await seedBaselineAdministrator();
  console.log(`Baseline administrator upserted: ${ADMIN_EMAIL}`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
