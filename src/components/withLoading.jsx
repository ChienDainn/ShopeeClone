export function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    if (props.isLoading) return <p className="demo-result">Đang tải...</p>
    return <WrappedComponent {...props} />
  }
}
