import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { DxrButton } from '@/components/Elements';
import {
  DxrForm,
  FormDrawer,
  InputField,
  TextAreaField,
  DxrSelectField,
  DateTimeField,
  FileField,
} from '@/components/Form';
import { isNftAccess } from '@/lib/authorization';

// import { Authorization, ROLES } from '@/lib/authorization';

import { CreateEventDetailDTO, useCreateEventDetail } from '../api/createEventDetail';

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
  // imagePath: z.string(),
  fileData: z.any(),
});

export const CreateEventDetail = () => {
  const createEventDetailMutation = useCreateEventDetail();

  return (
    // <Authorization allowedRoles={[ROLES.ADMIN]}>
    <FormDrawer
      isDone={createEventDetailMutation.isSuccess}
      triggerButton={
        <DxrButton
          size="sm"
          className="dxr-button-reduce-mt"
          startIcon={<PlusIcon className="h-4 w-4" />}
        >
          Create Event Detail
        </DxrButton>
      }
      title="Create Event Detail"
      submitButton={
        <DxrButton
          form="create-eventdetail"
          type="submit"
          size="sm"
          isLoading={createEventDetailMutation.isLoading}
        >
          Submit
        </DxrButton>
      }
    >
      <DxrForm<CreateEventDetailDTO['data'], typeof schema>
        id="create-eventdetail"
        onSubmit={async (values) => {
          await createEventDetailMutation.mutateAsync({ data: values });
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
              label="Event Content"
              error={formState.errors['eventContent']}
              registration={register('eventContent')}
            />
            {/* <InputField
              label='Image Path'
              error={formState.errors['imagePath']}
              registration={register('imagePath')}
            /> */}
            <FileField
              type="file"
              label="Select File"
              // error={formState.errors['fileData']}
              registration={register('fileData')}
              isMultiple={false}
            />
          </>
        )}
      </DxrForm>
    </FormDrawer>
    //  </Authorization>
  );
};
