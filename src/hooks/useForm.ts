import type { FormEvent } from "react";
import { useEffect, useState } from "react";

export type Error<T> = { [P in keyof T]?: string };

interface Options<T> {
  initialValues: T;
  onSubmit(values: T): void;
  validate(values: T): Error<T>;
}

const useForm = <T, H extends HTMLElement = HTMLFormElement>({
  initialValues,
  onSubmit,
  validate,
}: Options<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Error<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newError = validate(values);
    setErrors(newError);
  }, [values]);

  const handleSubmit = async (e: FormEvent<H>) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate ? validate(values) : {};
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    setValues,
    handleSubmit,
  };
};

export default useForm;
