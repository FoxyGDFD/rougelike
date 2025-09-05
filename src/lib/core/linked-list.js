var Class = $import('./class')

function Node(item) {
  this.item = item
  this.next = null
  this.prev = null
}

var LinkedList = Class.create({
  constructor: function () {
    this.head = null
    this.tail = null
    this.length = 0
    this.current = null
  },
  methods: {
    toArray: function () {
      var array = []
      var current = this.head
      for (var _ in this.length) {
        array.push(current)
        current.next
      }
      return array
    },
    add: function (item) {
      var node = new Node(item)
      if (!this.head) {
        this.head = node
        this.tail = node
        node.next = node // цикличный список
        node.prev = node
      } else {
        node.prev = this.tail
        node.next = this.head
        this.tail.next = node
        this.head.prev = node
        this.tail = node
      }
      if (!this.current) this.current = node
      this.length++
      return this
    },
    removeCurrent: function () {
      if (!this.current) return

      if (this.length === 1) {
        this.head = null
        this.tail = null
        this.current = null
      } else {
        this.current.prev.next = this.current.next
        this.current.next.prev = this.current.prev
        if (this.current === this.head) this.head = this.current.next
        if (this.current === this.tail) this.tail = this.current.prev
        this.current = this.current.next
      }
      this.length--

      return this
    },

    nextItem: function () {
      if (!this.current) return
      this.current = this.current.next
      return this
    },

    prevItem: function () {
      if (!this.current) return
      this.current = this.current.prev
      return this
    },

    getCurrent: function () {
      return this.current ? this.current.item : null
    },
  },
})

module.exports = LinkedList
