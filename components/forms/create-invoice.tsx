"use client";

import { useActionState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { invoiceSchema } from "@/lib/zod-schemas";
import { createInvoiceAction } from "@/app/actions/create-invoice-action";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const CreateInvoice = () => {
  const [state, formAction] = useActionState(createInvoiceAction, {
    message: "",
  });

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
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

  const formRef = useRef<HTMLFormElement>(null);

  console.log("isSubmitting:", isSubmitting);

  return (
    <Form {...form}>
      {state?.message !== "" && !state.issues && (
        <p className="text-red-500">{state.message}</p>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => {
              return (
                <li key={issue} className="flex gap-1">
                  {issue}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(() => {
            formAction(new FormData(formRef.current!));
            reset();
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
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your billing amount"
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
          <Button className="flex-1" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Submit form</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateInvoice;
