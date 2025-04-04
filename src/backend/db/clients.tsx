import { Database } from "bun:sqlite";
import { faker } from "@faker-js/faker";

export function seedClients(db: Database, count: number): number[] {
  console.log(`👤 Generating ${count} random clients...`);

  const clientIds: number[] = [];
  const insertClient = db.prepare(`
    INSERT INTO clients (name, email, phone, address)
    VALUES (?, ?, ?, ?)
  `);

  db.transaction(() => {
    for (let i = 0; i < count; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      });
      const phone = faker.phone.number();
      const address = faker.location.streetAddress({ useFullAddress: true });

      const info = insertClient.run(name, email, phone, address);
      clientIds.push(Number(info.lastInsertRowid));
    }
  })();

  return clientIds;
}
