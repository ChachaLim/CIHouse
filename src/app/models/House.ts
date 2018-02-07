export interface House {
  id?: String;
  price?: String;
  hostName?: String;
  hostUID?: String;
  houseName?: String;
  address?: String;
  path?: String;
  coords?: {
    lat?: string;
    lng?: string;
  };
}
