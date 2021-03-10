export interface Section {
  id: number;
  name: string;
  to: string;
}

export interface Block {
  id: number;
  section: number;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  background: string;
}
