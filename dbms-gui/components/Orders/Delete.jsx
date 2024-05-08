'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  bill_no: z.string(),
})

export default function Delete() {
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bill_no: '',
    },
  })

  async function onSubmit(data) {
    const postData = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bill_no: data.bill_no,
      }),
    }

    const res = await fetch('http://localhost:3000/api/Orders', postData)
    const response = await res.json()
    if (response.response.message !== 'error') {
      toast({
        title: 'Order Deleted!',
      })
    } else {
      toast({
        title: response.response.error,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 mx-auto">
        {/* worker_id */}
        <FormField
          control={form.control}
          name="bill_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bill No</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2">
          Delete Order
        </Button>
      </form>
    </Form>
  )
}
