import { invoke } from "@tauri-apps/api/core";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { useEffect, useState } from "react";
import {QRCodeSVG} from "qrcode.react";
import ExternalLink from "./link";
import { ArrowUpRight } from "lucide-react";

export default function DeviceConnectDialogueContent() {
  const [ipAddr, setIpAddr] = useState<string | undefined>();

  useEffect(() => {
    invoke("get_ip_address").then((val) => {
      if (typeof val === "string")
        setIpAddr(val);
    });
  }, []);

  const link = `http://${ipAddr}:2420`;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Connect a device</DialogTitle>
        <DialogDescription>Scan the QR code below to add a device.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-md size-fit">
          {ipAddr ? <QRCodeSVG value={link} className="size-48" /> : null}
        </div>
      </div>
      <span className="text-center">Or go to <ExternalLink to={link}>{link} <ArrowUpRight /></ExternalLink></span>
    </DialogContent>
  );
}
