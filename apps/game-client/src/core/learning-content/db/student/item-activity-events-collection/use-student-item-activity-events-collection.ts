import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createStudentItemActivityEventsCollection } from './create-student-item-activity-events-collection';

export function useStudentItemActivityEventsCollection() {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createStudentItemActivityEventsCollection({ queryClient });
  }, [queryClient]);
}
