import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useQuery, useQueryClient } from 'react-query';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
	const { data } = await axiosInstance.get('/treatments');
	return data;
}

export function useTreatments(): Treatment[] {
	const toast = useCustomToast();

	const fallback = [];
	const { data = fallback } = useQuery(queryKeys.treatments, getTreatments);
	console.log('data', data);
	return data;
}

export function usePrefetchTreatments(): void {
	const queryClient = useQueryClient();
	queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
