'use server';

import { revalidatePath } from 'next/cache';

import { ID, Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import {
	BUCKET_ID,
	DATABASE_ID,
	ENDPOINT,
	APPOINTMENT_COLLECTION_ID,
	PROJECT_ID,
	databases,
	storage,
	users,
} from '../appwrite.config';
import { parseStringify } from '../utils';

// CREATE APPWRITE USER
export const createAppointment = async (appointment: CreateAppointmentParams) => {
	try {
		const newAppointment = await databases.createDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			ID.unique(),
			appointment
		);

		revalidatePath('/admin');
		return parseStringify(newAppointment);
	} catch (error: any) {
		console.error('An error occurred while creating a new appointment:', error);
	}
};


