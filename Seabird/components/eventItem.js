import React, { Component } from 'react';
export class EventItem extends Component {
  title: string
  group: string
  description: string
  location: string
  date: string //Date
  type: string

  constructor(title, group, description, loation, date, type, props) {
    super(props)
    this.title = title
    this.group = group
    this.description = description
    this.location = location
    this.date = date
    this.type = type
    this.props = props
  }
}
