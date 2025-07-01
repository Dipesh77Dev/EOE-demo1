export interface IEventDetail {
  _id: string;
  name: string;
  description: string;
  eventType: string;
  startTime: Date; // string
  endTime: Date; // string
  nftAccess: string; // Boolean
  nftPurchaseUrl: string;
  nftAddress: string;
  eventContent: string;
  imagePath: string;
}

export interface IEventDetailInputDTO {
  // _id: string;
  name: string;
  description: string;
  eventType: string;
  startTime: Date; // string
  endTime: Date; // string
  nftAccess: string; // Boolean
  nftPurchaseUrl: string;
  nftAddress: string;
  eventContent: string;
  imagePath: string;
}
