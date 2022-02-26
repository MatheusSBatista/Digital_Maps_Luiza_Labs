import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class interestPoints {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'nome', length: 500 })
  name: string;

  @Column({name: 'latitude'})//X
  latitude: number ;

  @Column({name: 'longitude'})//Y
  longitude: number ;

  @Column({name: 'meters'})
  meters: number ;

  @Column({name: 'open'})
  open: Date ;

  @Column({name: 'close'})
  close: Date ;
}