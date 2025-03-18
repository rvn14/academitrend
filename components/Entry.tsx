"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { GraduationCap, UniversityIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  university: z
    .string({
      required_error: "Please select an university.",
    })
    .nonempty(),
  course: z
    .string({
      required_error: "Please select a course or a degree.",
    })
    .nonempty(),
});

export default function SelectForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Mapping of universities to course options
  const courseOptions: Record<string, { value: string; label: string }[]> = {
    uok: [
      {
        value: "cs",
        label: "Bachelor of Science Honours in Computer Science",
      },
      {
        value: "ct",
        label:
          "Bachelor of Information and Communication Technology Honours",
      },
      {
        value: "et",
        label:
          "Bachelor of Engineering Technology Honours Degree",
      },
    ],
    uom: [
      { value: "it", label: "Information Technology" },
      { value: "engtech", label: "Engineering Technology" },
    ],
    ucsc: [
      { value: "cs", label: "Bachelor of Science Honours in Computer Science" },
      { value: "ai", label: "Artificial Intelligence" },
    ],
  };

  // Watch the university field in real time
  const selectedUniversity = useWatch({
    control: form.control,
    name: "university",
  });

  // Clear the course field when university changes to avoid mismatches
  useEffect(() => {
    form.setValue("course", "");
  }, [selectedUniversity, form]);

  // Filter course options based on the selected university
  const coursesForSelectedUniversity = courseOptions[selectedUniversity] || [];

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Form submitted successfully!");
    console.log(data);
    router.push("/predict");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full space-y-8 p-4"
      >
        {/* University Select */}
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl flex items-center gap-2">
                <UniversityIcon />
                <span>University</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full overflow-hidden truncate">
                    <SelectValue placeholder="Select your university" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-auto max-w-[90vw] overflow-auto whitespace-normal break-words">
                  <SelectItem value="uok" className="truncate">
                    University of Kelaniya
                  </SelectItem>
                  <SelectItem value="uom" className="truncate">
                    University of Moratuwa
                  </SelectItem>
                  <SelectItem value="ucsc" className="truncate">
                    University of Colombo School of Computing
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the university you are interested in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Course Select */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl flex items-center gap-2">
                <GraduationCap />
                <span>Course/Degree</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full overflow-hidden truncate">
                    <SelectValue placeholder="Select your course program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-auto max-w-[90vw] sm:max-w-full overflow-auto whitespace-normal break-words">
                  {coursesForSelectedUniversity.length > 0 ? (
                    coursesForSelectedUniversity.map((course) => (
                      <SelectItem
                        key={course.value}
                        value={course.value}
                        className="truncate"
                      >
                        {course.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-option" disabled className="truncate">
                      Please select a university first
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                {selectedUniversity
                  ? "Select the course program you are interested in."
                  : "Please select a university first."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="bg-maroon-700 hover:bg-maroon-800 cursor-pointer font-semibold"
          type="submit"
        >
          Proceed
        </Button>
      </form>
    </Form>
  );
}
