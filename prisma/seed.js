const { PrismaClient, UserRole } = require('@prisma/client');

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'crmdev786@gmail.com';

async function ensureOwnerRoleEnum() {
  const existingOwnerRole = await prisma.$queryRaw`
    SELECT e.enumlabel
    FROM pg_enum e
    INNER JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'UserRole' AND e.enumlabel = 'OWNER'
  `;

  if (existingOwnerRole.length === 0) {
    await prisma.$executeRawUnsafe(`ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'OWNER'`);
  }
}

async function seedBaselineAdministrator() {
  await ensureOwnerRoleEnum();

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      role: UserRole.OWNER,
      is_active: true
    },
    create: {
      email: ADMIN_EMAIL,
      first_name: 'Baseline',
      last_name: 'Administrator',
      password_hash: 'change-me',
      role: UserRole.OWNER,
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
