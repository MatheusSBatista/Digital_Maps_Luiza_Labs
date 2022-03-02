import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InterestPoints {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: 'name', length: 500 })
  name: string;

  @Column({ name: 'latitude' })//X
  latitude: number;

  @Column({ name: 'longitude' })//Y
  longitude: number;

  @Column({ name: 'open', default: () => null })
  open: string;

  @Column({ name: 'close', default: () => null })
  close: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  constructor(interestPoints?: Partial<InterestPoints>) {
    this.id = interestPoints?.id;
    this.name = interestPoints?.name;
    this.latitude = interestPoints?.latitude;
    this.longitude = interestPoints?.longitude;
    this.open = interestPoints?.open;
    this.close = interestPoints?.close
    this.created_at = interestPoints?.created_at;
    this.updated_at = interestPoints?.updated_at
  }
}