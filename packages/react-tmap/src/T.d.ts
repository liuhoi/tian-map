interface AdministrativeDivisionOptions {
  searchWord:string
  searchType:number
  needSubInfo:boolean
  needAll:boolean
  needPolygon:boolean
  needPre:boolean
}

interface AdministrativeDivisionResult{
  getStatus():number
  getMsg():string
  getDataVersion():any
  getData():any
}

interface AdministrativeDivisionCallback   {
  (rs:AdministrativeDivisionResult):any
}

declare namespace T {
  export class LngLat  {
    constructor(lng:number,lat:number)
    public getLng():number
    public getLat():number
    public distanceTo(other:LngLat):number
    public equals(other:LngLat):boolean
  }
  export class AdministrativeDivision{
    constructor(){}
    public search(config:AdministrativeDivisionOptions,callback:AdministrativeDivisionCallback):any
  }
  export const dq :any
 
}