"use client";

import { useFormState } from "react-dom";
import { useActionState, useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createInvoiceAction } from "@/app/actions/create-invoice-action";
import { createInvoiceSchema } from "@/lib/zod-schemas";
import { type CreateInvoiceType } from "@/lib/zod-schemas";

const CreateInvoice = ({
  createInvoiceAction,
}: {
  createInvoiceAction: (prevState: {
    message: string;
    invoice?: CreateInvoiceType;
    issues?: string[];
  }) => Promise<{
    message: string;
    invoice?: CreateInvoiceType;
    issues?: string[];
  }>;
}) => {
  const [state, formAction] = useFormState(createInvoiceAction, {
    message: "",
  });

  const form = useForm<CreateInvoiceType>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      billingName: "",
      billingEmail: "",
      value: 0,
      description: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: CreateInvoiceType) => {
    console.log(data);
    reset();
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      {state?.message !== "" && !state.issues && (
        <h2 className="text-blue-700 font-medium text-xl">{state?.message}</h2>
      )}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(event);
        }}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={control}
          name="billingName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Billing Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your billing name"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="billingEmail"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Billing Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your billing email"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="value"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your billing value"
                    {...field}
                    autoComplete="off"
                    onChange={(event) => {
                      field.onChange(Number(event.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description of the invoice"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-between gap-4 items-center !mt-8">
          <Button
            variant="secondary"
            className="flex-1"
            type="reset"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
          <Button className="flex-1">Submit form</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateInvoice;
