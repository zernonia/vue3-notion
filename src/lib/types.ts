export interface BlockMap {
  [key: string]: Block
}

export interface Block {
  role: Role
  value: BlockValue
}

export interface BlockValue {
  id: string
  version: number
  type: string
  properties: Properties
  content: string[]
  format: Format
  permissions: Permission[]
  created_time: number
  last_edited_time: number
  parent_id: string
  parent_table: string
  alive: boolean
  created_by_table: string
  created_by_id: string
  last_edited_by_table: string
  last_edited_by_id: string
  space_id: string
}

export interface Format {
  domain?: string
  original_url?: string
  page_icon?: string
  [key: string]: any
}

export interface Permission {
  role: Role
  type: string
  added_timestamp: number
}

export interface Properties {
  title: string[]
  caption?: string[]
  description?: string[]
}

export enum Role {
  Reader = "reader",
}

export interface NotionBlockProps {
  blockMap: BlockMap
  contentId: string
  contentIndex: number
  embedAllow: string
  fullPage: boolean
  hideList: any[]
  level: number
  mapImageUrl: Function
  mapPageUrl: Function
  pageLinkOptions: Object
  pageLinkTarget: string
  prism: boolean
  katex: boolean
  textLinkTarget: string
  todo: boolean
}
