import { PencilIcon, PlusIcon } from '@heroicons/react/solid';
import * as z from 'zod';
import 'react-datepicker/dist/react-datepicker.css';

import { DxrButton } from '@/components/Elements';
import {
  DxrForm,
  FormDrawer,
  InputField,
  TextAreaField,
  DxrSelectField,
  FileField,
  DateTimeField,
} from '@/components/Form';
import { isNftAccess } from '@/lib/authorization';

import { AddEventImagesDTO, useAddEventImages } from '../api/addEventImages';
import { useEventDetail } from '../api/getEventDetail';
import { UpdateEventDetailDTO, useUpdateEventDetail } from '../api/updateEventDetail';

type UpdateEventDetailProps = {
  eventDetailId?: string;
};

const schema = z.object({
  name: z.string(),
  description: z.string(),
  eventType: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  nftAccess: z.string(),
  nftPurchaseUrl: z.string(),
  nftAddress: z.string(),
  eventContent: z.string(),
  imagePath: z.string(),
  fileData: z.any(),
});

const addEventImagesSchema = z.object({
  eventId: z.string().min(1, 'Required'),
  fileData: z.any(),
});

export const UpdateEventDetail = ({ eventDetailId }: UpdateEventDetailProps) => {
  const eventDetailQuery = useEventDetail({ eventDetailId });
  const updateEventDetailMutation = useUpdateEventDetail();
  const addEventImagesMutation = useAddEventImages();

  return (
    <>
      {/* <Authorization allowedRoles={[ROLES.ADMIN]}> */}
      <FormDrawer
        isDone={updateEventDetailMutation.isSuccess}
        triggerButton={
          <DxrButton
            startIcon={<PencilIcon className="h-4 w-4" />}
            size="sm"
            className="dxr-button-reduce-mt"
          >
            Update Event Detail
          </DxrButton>
        }
        title="Update Event Detail"
        submitButton={
          <DxrButton
            form="update-eventdetail"
            type="submit"
            size="sm"
            isLoading={updateEventDetailMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<UpdateEventDetailDTO['data'], typeof schema>
          id="update-eventdetail"
          onSubmit={async (values) => {
            await updateEventDetailMutation.mutateAsync({ data: values, eventDetailId });
          }}
          options={{
            defaultValues: {
              name: eventDetailQuery.data?.name,
              description: eventDetailQuery.data?.description,
              eventType: eventDetailQuery.data?.eventType,
              startTime:
                eventDetailQuery.data !== undefined
                  ? new Date(eventDetailQuery.data.startTime)
                  : new Date(),
              endTime:
                eventDetailQuery.data !== undefined
                  ? new Date(eventDetailQuery.data.endTime)
                  : new Date(),
              nftAccess: eventDetailQuery.data?.nftAccess,
              nftPurchaseUrl: eventDetailQuery.data?.nftPurchaseUrl,
              nftAddress: eventDetailQuery.data?.nftAddress,
              eventContent: eventDetailQuery.data?.eventContent,
              imagePath: eventDetailQuery.data?.imagePath,
            },
          }}
          schema={schema}
        >
          {({ register, formState, watch, setValue }) => (
            <>
              <InputField
                label="Name"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <TextAreaField
                label="Description"
                error={formState.errors['description']}
                registration={register('description')}
              />
              <InputField
                label="Event Type"
                error={formState.errors['eventType']}
                registration={register('eventType')}
              />
              <DateTimeField
                label="Start Time"
                selected={watch('startTime')}
                setNewValue={(value) => {
                  setValue('startTime', value);
                }}
                error={formState.errors['startTime']}
                registration={register('startTime')}
              />
              <DateTimeField
                label="End Time"
                selected={watch('endTime')}
                setNewValue={(value) => {
                  setValue('endTime', value);
                }}
                error={formState.errors['endTime']}
                registration={register('endTime')}
              />
              <DxrSelectField
                label="NFT Access"
                error={formState.errors['nftAccess']}
                registration={register('nftAccess')}
                options={isNftAccess.map((access) => ({
                  label: access.value,
                  value: access.value,
                }))}
              />
              <InputField
                label="Event Content Url"
                error={formState.errors['nftPurchaseUrl']}
                registration={register('nftPurchaseUrl')}
              />
              <InputField
                label="NFT Address"
                error={formState.errors['nftAddress']}
                registration={register('nftAddress')}
              />
              <InputField
                label="Event Content URL"
                error={formState.errors['eventContent']}
                registration={register('eventContent')}
              />
            </>
          )}
        </DxrForm>
      </FormDrawer>

      <FormDrawer
        isDone={addEventImagesMutation.isSuccess}
        triggerButton={
          <DxrButton
            className="sm dxr-button-reduce-mt"
            size="sm"
            startIcon={<PlusIcon className="h-4 w-4" />}
          >
            Change Image
          </DxrButton>
        }
        title="Change Image"
        submitButton={
          <DxrButton
            form="addEventImages"
            type="submit"
            size="sm"
            isLoading={addEventImagesMutation.isLoading}
          >
            Submit
          </DxrButton>
        }
      >
        <DxrForm<AddEventImagesDTO['data'], typeof addEventImagesSchema>
          id="addEventImages"
          onSubmit={async (values) => {
            await addEventImagesMutation.mutateAsync({ data: values });
          }}
          options={{
            defaultValues: {
              eventId: eventDetailId,
            },
          }}
          schema={addEventImagesSchema}
        >
          {({ register }) => (
            <>
              <FileField
                type="file"
                label="Select File"
                registration={register('fileData')}
                isMultiple={false}
              />
            </>
          )}
        </DxrForm>
      </FormDrawer>
    </>
  );
};
