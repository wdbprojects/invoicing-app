"use client";

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
import { z } from "zod";

const formSchema = z.object({
  billingName: z.string().min(1, { message: "Required field" }),
  billingEmail: z.string().min(1, { message: "Required field" }).email({
    message: "Must be a valid email",
  }),
  value: z.number().gt(0, { message: "Value must be greater than 0" }),
  description: z.string().min(1, { message: "Required field" }),
});

const CreateInvoice = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billingName: "",
      billingEmail: "",
      value: 0,
      description: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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

        <div className="flex justify-between gap-4 items-center !mt-6">
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
