
## Fn::Join
```json
{ "Fn::Join" : [ "delimiter", [ comma-delimited list of values ] ] }
// example
"Fn::Join" : [ ":", [ "a", "b", "c" ] ]
```

```yaml
Fn::Join: [ delimiter, [ comma-delimited list of values ] ]
## Example

!Join [ ":", [ a, b, c ] ]
```

## Fn::Sub
### REF
- *https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html*
```json
{ "Fn::Sub" : [ String, { Var1Name: Var1Value, Var2Name: Var2Value } ] }

//example
{
    "Name": {
        "Fn::Sub": [
            "www.${Domain}",
            {
                "Domain": {
                    "Ref": "RootDomainName"
                }
            }
        ]
    }
}
```


```yaml
Fn::Sub:
  - String
  - Var1Name: Var1Value
    Var2Name: Var2Value
# Example
Name: !Sub 
  - 'www.${Domain}'
  - Domain: !Ref RootDomainName
```
