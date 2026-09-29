import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-white p-8 rounded-none border border-neutral-200 font-inter">
        <DialogHeader className="mb-4">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 uppercase mb-1">
            ELEGANCE MEASUREMENTS
          </span>
          <DialogTitle className="font-syne font-black text-xl text-black tracking-[0.15em] uppercase">
            SIZE GUIDE &mdash; {category}
          </DialogTitle>
          <p className="text-xs text-neutral-500 font-normal">
            All body measurements are indicated in inches and centimeters for standard European tailoring.
          </p>
        </DialogHeader>

        <div className="mt-2 space-y-6">
          <div className="border border-neutral-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow className="border-b border-neutral-200">
                  <TableHead className="font-bold text-[11px] text-black uppercase tracking-wider">Size</TableHead>
                  <TableHead className="font-bold text-[11px] text-black uppercase tracking-wider">Chest / Bust</TableHead>
                  <TableHead className="font-bold text-[11px] text-black uppercase tracking-wider">Waist</TableHead>
                  <TableHead className="font-bold text-[11px] text-black uppercase tracking-wider">Hips</TableHead>
                  <TableHead className="font-bold text-[11px] text-black uppercase tracking-wider">EU / US</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs text-neutral-700">
                <TableRow className="border-b border-neutral-100">
                  <TableCell className="font-bold text-black">XS</TableCell>
                  <TableCell>34 - 36 in (86 - 91 cm)</TableCell>
                  <TableCell>28 - 30 in (71 - 76 cm)</TableCell>
                  <TableCell>35 - 37 in (89 - 94 cm)</TableCell>
                  <TableCell>36 / 46</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-100">
                  <TableCell className="font-bold text-black">S</TableCell>
                  <TableCell>36 - 38 in (91 - 96 cm)</TableCell>
                  <TableCell>30 - 32 in (76 - 81 cm)</TableCell>
                  <TableCell>37 - 39 in (94 - 99 cm)</TableCell>
                  <TableCell>38 / 48</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-100">
                  <TableCell className="font-bold text-black">M</TableCell>
                  <TableCell>38 - 40 in (96 - 101 cm)</TableCell>
                  <TableCell>32 - 34 in (81 - 86 cm)</TableCell>
                  <TableCell>39 - 41 in (99 - 104 cm)</TableCell>
                  <TableCell>40 / 50</TableCell>
                </TableRow>
                <TableRow className="border-b border-neutral-100">
                  <TableCell className="font-bold text-black">L</TableCell>
                  <TableCell>40 - 42 in (101 - 106 cm)</TableCell>
                  <TableCell>34 - 36 in (86 - 91 cm)</TableCell>
                  <TableCell>41 - 43 in (104 - 109 cm)</TableCell>
                  <TableCell>42 / 52</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-black">XL</TableCell>
                  <TableCell>42 - 45 in (106 - 114 cm)</TableCell>
                  <TableCell>36 - 39 in (91 - 99 cm)</TableCell>
                  <TableCell>43 - 46 in (109 - 117 cm)</TableCell>
                  <TableCell>44 / 54</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="text-[11px] text-neutral-500 space-y-1">
            <p>&bull; <strong>Fit Note:</strong> Designed for an editorial silhouette with natural drapery.</p>
            <p>&bull; Need custom tailoring assistance? Inquire at any Elegance Threads boutique.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;
