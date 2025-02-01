# Requester.py Documentation
read_item calling convention: `read_item("video id as a string")`
read_item returns a set of 2 integers. The first one is the content type, and the second is the length of the video in seconds.

Example usage:

```
print(read_item("B8VR5mQcgjI"))
>> {24, 211}
```