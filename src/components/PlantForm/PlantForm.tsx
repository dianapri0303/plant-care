'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { getSpecies } from '@/lib/api/catalog';
import type { GardenPlant } from '@/types/garden';
import css from './PlantForm.module.css';

export interface PlantFormValues {
  speciesId: string;
  nickname: string;
  location: string;
  acquiredAt: string;
  wateringFrequencyDays: number;
}

interface PlantFormProps {
  title: string;
  submitLabel: string;
  plant?: GardenPlant;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (values: PlantFormValues, photo: File | null) => void;
}

const schema = Yup.object({
  speciesId: Yup.string().required('Please choose a species'),
  nickname: Yup.string()
    .max(40, 'Name must be at most 40 characters')
    .required('Name is required'),
  location: Yup.string()
    .max(40, 'Location must be at most 40 characters')
    .required('Location is required'),
  acquiredAt: Yup.string().required('Please choose a date'),
  wateringFrequencyDays: Yup.number()
    .min(1, 'Minimum is 1 day')
    .max(60, 'Maximum is 60 days')
    .required('This field is required'),
});

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8.99997 1.45231L10.85 3.39531C10.8987 3.449 10.9581 3.4919 11.0244 3.52126C11.0907 3.55061 11.1625 3.56578 11.235 3.56578C11.3075 3.56578 11.3792 3.55061 11.4455 3.52126C11.5118 3.4919 11.5712 3.449 11.62 3.39531C11.834 3.16731 11.834 2.79531 11.62 2.56631L9.66997 0.516315C9.52458 0.353867 9.34657 0.223913 9.14755 0.134943C8.94852 0.0459728 8.73297 -1.43051e-05 8.51497 -1.43051e-05C8.29696 -1.43051e-05 8.08141 0.0459728 7.88239 0.134943C7.68337 0.223913 7.50535 0.353867 7.35997 0.516315L5.40997 2.56631C5.30702 2.67982 5.25 2.82758 5.25 2.98081C5.25 3.13405 5.30702 3.28181 5.40997 3.39531C5.45871 3.449 5.51814 3.4919 5.58444 3.52126C5.65075 3.55061 5.72246 3.56578 5.79497 3.56578C5.86748 3.56578 5.93919 3.55061 6.00549 3.52126C6.0718 3.4919 6.13123 3.449 6.17997 3.39531L7.99997 1.48431V10.0103C7.99997 10.3173 8.22397 10.5663 8.49997 10.5663C8.77597 10.5663 8.99997 10.3173 8.99997 10.0103V1.45231Z"
      fill="currentColor"
    />
    <path
      d="M15.9996 13.006V10H14.9996V13.006C14.9994 13.2695 14.8946 13.5222 14.7082 13.7086C14.5218 13.8949 14.2692 13.9997 14.0056 14H3.00962C2.74608 13.9997 2.49341 13.8949 2.30705 13.7086C2.1207 13.5222 2.01589 13.2695 2.01562 13.006V10H1.01562V13.006C1.01562 14.106 1.90762 15 3.00962 15H14.0056C15.1056 15 15.9996 14.107 15.9996 13.006Z"
      fill="currentColor"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 24" fill="none">
    <path
      d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6Z"
      fill="currentColor"
    />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="20" viewBox="0 0 16 24" fill="none">
    <path
      d="M5 11H7V8.25H9V11H11V6.25L8 4.25L5 6.25V11ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path
      d="M1.4 2.43187e-05L0 1.40002L6 7.40002L12 1.40002L10.6 2.43187e-05L6 4.60002L1.4 2.43187e-05Z"
      fill="currentColor"
    />
  </svg>
);

function SpeciesSelect() {
  const { values, setFieldValue } = useFormikContext<PlantFormValues>();
  const [isOpen, setIsOpen] = useState(false);

  const { data: species } = useQuery({
    queryKey: ['species'],
    queryFn: getSpecies,
    staleTime: Infinity,
  });

  const selected = species?.find(item => item._id === values.speciesId);

  return (
    <div className={css.field}>
      <span className={css.label}>Species</span>

      <div className={css.select}>
        <button
          type="button"
          className={`${css.selectButton} ${isOpen ? css.selectOpen : ''}`}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {selected ? selected.commonName : 'Select species'}
          <span
            className={`${css.selectArrow} ${isOpen ? css.selectArrowOpen : ''}`}
          >
            <ArrowIcon />
          </span>
        </button>

        {isOpen && species && (
          <div className={css.options}>
            {species.map(item => (
              <button
                key={item._id}
                type="button"
                className={`${css.option} ${
                  item._id === values.speciesId ? css.optionActive : ''
                }`}
                onClick={() => {
                  setFieldValue('speciesId', item._id);
                  setIsOpen(false);
                }}
              >
                {item.commonName}
              </button>
            ))}
          </div>
        )}
      </div>

      <ErrorMessage name="speciesId" component="p" className={css.error} />
    </div>
  );
}

export default function PlantForm({
  title,
  submitLabel,
  plant,
  isPending,
  onClose,
  onSubmit,
}: PlantFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    plant?.photoUrl ?? null,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Photo must be smaller than 5 MB');
      event.target.value = '';
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const openDatePicker = () => {
    dateRef.current?.showPicker?.();
  };

  const initialValues: PlantFormValues = {
    speciesId: plant?.speciesId?._id ?? '',
    nickname: plant?.nickname ?? '',
    location: plant?.location ?? '',
    acquiredAt: plant?.acquiredAt ? plant.acquiredAt.slice(0, 10) : '',
    wateringFrequencyDays: plant?.wateringFrequencyDays ?? 7,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={values => onSubmit(values, photo)}
    >
      {({ values, setFieldValue, submitForm }) => (
        <Modal
          title={title}
          onClose={onClose}
          footer={
            <>
              <button type="button" className={css.cancel} onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className={css.submit}
                onClick={submitForm}
                disabled={isPending}
              >
                {isPending ? 'Saving...' : submitLabel}
              </button>
            </>
          }
        >
          <Form className={css.form}>
            <div className={css.photoRow}>
              <div className={css.preview}>
                {preview && (
                  <Image
                    src={preview}
                    alt=""
                    fill
                    className={css.previewImage}
                    unoptimized
                  />
                )}
              </div>

              <div className={css.photoSide}>
                <button
                  type="button"
                  className={css.chooseFile}
                  onClick={() => fileRef.current?.click()}
                >
                  <span className={css.chooseFileIcon}>
                    <UploadIcon />
                  </span>
                  Choose file
                </button>
                <p className={css.hint}>.jpg, .png, .webp</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={css.fileInput}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="nickname">
                Give it a name
              </label>
              <Field
                id="nickname"
                name="nickname"
                placeholder="e.g. Phyllis"
                className={css.input}
              />
              <ErrorMessage
                name="nickname"
                component="p"
                className={css.error}
              />
            </div>

            <SpeciesSelect />

            <div className={css.field}>
              <label className={css.label} htmlFor="acquiredAt">
                When did you get it?
              </label>
              <div className={css.inputWrapper}>
                <input
                  ref={dateRef}
                  id="acquiredAt"
                  name="acquiredAt"
                  type="date"
                  value={values.acquiredAt}
                  onChange={event =>
                    setFieldValue('acquiredAt', event.target.value)
                  }
                  className={`${css.input} ${css.inputWithIcon} ${css.dateInput}`}
                />
                <button
                  type="button"
                  className={`${css.inputIcon} ${css.iconButton}`}
                  onClick={openDatePicker}
                  aria-label="Open calendar"
                >
                  <CalendarIcon />
                </button>
              </div>
              <ErrorMessage
                name="acquiredAt"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="location">
                Where does it live?
              </label>
              <div className={css.inputWrapper}>
                <Field
                  id="location"
                  name="location"
                  placeholder="e.g. Kitchen window"
                  className={`${css.input} ${css.inputWithIcon}`}
                />
                <span className={css.inputIcon}>
                  <PinIcon />
                </span>
              </div>
              <ErrorMessage
                name="location"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.watering}>
              <div className={css.wateringHead}>
                <span className={css.label}>Water every (days)</span>
                <span className={css.wateringValue}>
                  {values.wateringFrequencyDays}
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={values.wateringFrequencyDays}
                onChange={event =>
                  setFieldValue(
                    'wateringFrequencyDays',
                    Number(event.target.value),
                  )
                }
                className={css.range}
                aria-label="Watering frequency in days"
              />

              <div className={css.rangeLabels}>
                <span>Frequent (1)</span>
                <span>Monthly (30)</span>
              </div>
            </div>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}
