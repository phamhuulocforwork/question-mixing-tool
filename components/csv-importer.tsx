"use client";

import * as React from "react";

import { CommandList } from "cmdk";
import { ArrowLeft, Check, ChevronDown, Sheet, Upload, X } from "lucide-react";

import { FileUploader } from "@/components/file-uploader";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

import { useParseCsv } from "@/hooks/use-parse-csv";

interface CsvImporterProps
  extends React.ComponentPropsWithoutRef<typeof DialogTrigger>,
    ButtonProps {
  fields: {
    label: string;
    value: string;
    required?: boolean;
  }[];

  onImport: (data: Record<string, unknown>[]) => void;
}

export function CsvImporter({
  fields,
  onImport,
  className,
  ...props
}: CsvImporterProps) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<"upload" | "map">("upload");
  const {
    data,
    fieldMappings,
    onParse,
    onFieldChange,
    onFieldToggle,
    onFieldsReset,
    getSanitizedData,
  } = useParseCsv({ fields });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className={cn("w-fit", className)} {...props}>
          <Sheet />
          Tải lên file CSV
        </Button>
      </DialogTrigger>
      {step === "upload" ? (
        <DialogContent className='p-8 sm:max-w-xl'>
          <DialogHeader>
            <DialogTitle>Tải lên file CSV</DialogTitle>
            <DialogDescription>
              File CSV phải có các cột như sau:{" "}
              {fields.map((field) => field.value).join(", ")}
            </DialogDescription>
          </DialogHeader>
          <FileUploader
            accept={{ "text/csv": [] }}
            multiple={false}
            maxSize={4 * 1024 * 1024}
            maxFileCount={1}
            onUpload={async (files) => {
              const file = files[0];
              if (!file) return;

              onParse({ file, limit: 1001 });
              setStep("map");
            }}
          />
        </DialogContent>
      ) : (
        <DialogContent className='overflow-hidden p-8 sm:max-w-6xl'>
          <div className='flex flex-col items-center gap-2 sm:flex-row'>
            <DialogHeader className='flex-1'>
              <DialogTitle>Ánh xạ trường dữ liệu</DialogTitle>
              <DialogDescription>
                Ánh xạ các trường trong file CSV tương ứng với các trường trong
                bảng.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant='outline'
              className='w-full sm:w-fit'
              onClick={onFieldsReset}
            >
              Đặt lại
            </Button>
          </div>
          <div className='grid h-[26.25rem] w-full overflow-hidden rounded-md border'>
            <Table className='border-b'>
              <TableHeader className='sticky top-0 z-10 bg-background shadow'>
                <TableRow className='bg-muted/50'>
                  {fields.map((field) => (
                    <PreviewTableHead
                      key={field.value}
                      field={field}
                      onFieldChange={(f) => {
                        onFieldChange({
                          oldValue: f.value,
                          newValue: field.value,
                        });
                      }}
                      onFieldToggle={onFieldToggle}
                      originalFieldMappings={fieldMappings.original}
                      currentFieldMapping={fieldMappings.current[field.value]}
                      className='border-r'
                    />
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i} className='h-10'>
                    {fields.map((field) => (
                      <TableCell
                        key={field.value}
                        className='border-r last:border-r-0'
                      >
                        <span className='line-clamp-1'>
                          {String(row[field.value] ?? "")}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter className='gap-2 sm:space-x-0'>
            <Button variant='outline' onClick={() => setStep("upload")}>
              <X className='size-4' aria-hidden='true' />
              Hủy
            </Button>
            <Button
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                onImport(getSanitizedData({ data }));
                setOpen(false);
                setStep("upload");
              }}
            >
              <Upload className='size-4' aria-hidden='true' />
              Tải lên
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

interface PreviewTableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  field: { label: string; value: string; required?: boolean };
  onFieldChange: (props: { value: string; required?: boolean }) => void;
  onFieldToggle: (props: { value: string; checked: boolean }) => void;
  currentFieldMapping: string | undefined;
  originalFieldMappings: Record<string, string | undefined>;
}

function PreviewTableHead({
  field,
  onFieldChange,
  onFieldToggle,
  currentFieldMapping,
  originalFieldMappings,
  className,
  ...props
}: PreviewTableHeadProps) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);

  return (
    <TableHead className={cn("whitespace-nowrap py-2", className)} {...props}>
      <div className='flex items-center gap-4 pr-1.5'>
        <div className='flex items-center gap-2'>
          <Checkbox
            id={`${id}-${field.value}`}
            defaultChecked
            onCheckedChange={(checked) => {
              onFieldToggle({
                value: field.value,
                checked: !!checked,
              });
            }}
            disabled={field.required}
          />
          <Label htmlFor={`${id}-${field.value}`} className='truncate'>
            {field.label}
          </Label>
        </div>
        <ArrowLeft className='size-4' aria-hidden='true' />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              role='combobox'
              aria-expanded={open}
              className='w-48 justify-between'
            >
              {currentFieldMapping || "Select field..."}
              <ChevronDown className='ml-2 size-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
            <Command>
              <CommandInput placeholder='Search field...' />
              <CommandEmpty>No field found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {[...new Set(Object.values(originalFieldMappings))].map(
                    (fm) => (
                      <CommandItem
                        key={fm}
                        value={fm}
                        onSelect={() => {
                          onFieldChange({
                            value: fm ?? "",
                          });
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            currentFieldMapping === fm
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <span className='line-clamp-1'>{fm}</span>
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </TableHead>
  );
}
