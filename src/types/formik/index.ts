import { Dispatch, SetStateAction } from 'react';
import { FieldMetaProps } from 'formik/dist/types';

type SetErrors = Dispatch<SetStateAction<object | null>>;
type SetSubmitting = (isSubmitting: boolean) => void;

export interface ActionsProps {
  setErrors?: SetErrors;
  setSubmitting: SetSubmitting;
}

export interface TranslationProps {
  key: string;
  values: object;
}

export interface TranslationPropsWithLabel extends TranslationProps {
  label: TranslationProps;
}

export interface TranslationFieldMetaProps<Val> extends Omit<FieldMetaProps<Val>, 'error'> {
  error?: string | TranslationPropsWithLabel;
}