import { Bridged } from "../generated/SimpleOFT/SimpleOFT";
import { BridgeTransfer } from "../generated/schema";

export function handleBridged(event: Bridged): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let transfer = new BridgeTransfer(id);
  transfer.user = event.params.user;
  transfer.amount = event.params.amount;
  transfer.dstChainId = event.params.dstChainId;
  transfer.timestamp = event.block.timestamp;
  transfer.save();
}