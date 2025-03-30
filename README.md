# Diet Tracker PWA


## Troubleshooting
- Error: `SyntaxError: The requested module '@chakra-ui/react' does not provide an export named 'forwardRef'`
  - https://github.com/chakra-ui/chakra-ui/issues/7170
    - Suggested Fix: Set exact version for `@chakra-ui/icons` of `2.4.2` instead of `~2.4.2`
  - Solution: Remove library and use `react-icons`
- Error: `[Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.]`
  - https://www.reddit.com/r/nextjs/comments/1fznl56/chakra_ui_v3_introduced_so_many_breaking_changes/
  - Seems Chakra V3 introduced breaking changes, so nothing is going to work. I'm not using any fancy server components. I just want a component library, so V2 is more than enough for me. (I have no performance expectations for a qiuck SaaS app)