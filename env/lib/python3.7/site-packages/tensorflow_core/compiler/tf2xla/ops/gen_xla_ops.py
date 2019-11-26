"""Python wrappers around TensorFlow ops.

This file is MACHINE GENERATED! Do not edit.
Original C++ source file: gen_xla_ops.cc
"""

import collections

from tensorflow.python import pywrap_tensorflow as _pywrap_tensorflow
from tensorflow.python.eager import context as _context
from tensorflow.python.eager import core as _core
from tensorflow.python.eager import execute as _execute
from tensorflow.python.framework import dtypes as _dtypes

from tensorflow.python.framework import op_def_registry as _op_def_registry
from tensorflow.python.framework import ops as _ops
from tensorflow.python.framework import op_def_library as _op_def_library
from tensorflow.python.util.deprecation import deprecated_endpoints
from tensorflow.python.util import dispatch as _dispatch
from tensorflow.python.util.tf_export import tf_export

_XlaBroadcastHelperOutput = collections.namedtuple(
    "XlaBroadcastHelper",
    ["lhs_output", "rhs_output"])


@_dispatch.add_dispatch_list
@tf_export('xla_broadcast_helper')
def xla_broadcast_helper(lhs, rhs, broadcast_dims, name=None):
  r"""Helper operator for performing XLA-style broadcasts

  Broadcasts `lhs` and `rhs` to the same rank, by adding size 1 dimensions to
  whichever of `lhs` and `rhs` has the lower rank, using XLA's broadcasting rules
  for binary operators.

  Args:
    lhs: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the LHS input tensor
    rhs: A `Tensor`. Must have the same type as `lhs`. the RHS input tensor
    broadcast_dims: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      an XLA-style broadcast dimension specification
    name: A name for the operation (optional).

  Returns:
    A tuple of `Tensor` objects (lhs_output, rhs_output).

    lhs_output: A `Tensor`. Has the same type as `lhs`. the broadcasted LHS tensor
    rhs_output: A `Tensor`. Has the same type as `lhs`. the broadcasted RHS tensor
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaBroadcastHelper", name,
        tld.op_callbacks, lhs, rhs, broadcast_dims)
      _result = _XlaBroadcastHelperOutput._make(_result)
      return _result
    except _core._FallbackException:
      try:
        return xla_broadcast_helper_eager_fallback(
            lhs, rhs, broadcast_dims, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_broadcast_helper, lhs=lhs, rhs=rhs,
                                    broadcast_dims=broadcast_dims, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaBroadcastHelper", lhs=lhs, rhs=rhs, broadcast_dims=broadcast_dims,
                              name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_broadcast_helper, lhs=lhs, rhs=rhs,
                                broadcast_dims=broadcast_dims, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tindices",
              _op._get_attr_type("Tindices"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaBroadcastHelper", _inputs_flat, _attrs, _result)
  _result = _XlaBroadcastHelperOutput._make(_result)
  return _result

XlaBroadcastHelper = tf_export("raw_ops.XlaBroadcastHelper")(_ops.to_raw_op(xla_broadcast_helper))


def xla_broadcast_helper_eager_fallback(lhs, rhs, broadcast_dims, name, ctx):
  _attr_T, _inputs_T = _execute.args_to_matching_eager([lhs, rhs], ctx)
  (lhs, rhs) = _inputs_T
  _attr_Tindices, (broadcast_dims,) = _execute.args_to_matching_eager([broadcast_dims], ctx)
  _inputs_flat = [lhs, rhs, broadcast_dims]
  _attrs = ("T", _attr_T, "Tindices", _attr_Tindices)
  _result = _execute.execute(b"XlaBroadcastHelper", 2, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaBroadcastHelper", _inputs_flat, _attrs, _result)
  _result = _XlaBroadcastHelperOutput._make(_result)
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_conv')
def xla_conv(lhs, rhs, window_strides, padding, lhs_dilation, rhs_dilation, feature_group_count, dimension_numbers, precision_config, name=None):
  r"""Wraps the XLA ConvGeneralDilated operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#conv_convolution
  .

  Args:
    lhs: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the input tensor
    rhs: A `Tensor`. Must have the same type as `lhs`. the kernel tensor
    window_strides: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      the inter-window strides
    padding: A `Tensor`. Must have the same type as `window_strides`.
      the padding to apply at the start and end of each input dimensions
    lhs_dilation: A `Tensor`. Must have the same type as `window_strides`.
      dilation to apply between input elements
    rhs_dilation: A `Tensor`. Must have the same type as `window_strides`.
      dilation to apply between kernel elements
    feature_group_count: A `Tensor`. Must have the same type as `window_strides`.
      number of feature groups for grouped convolution.
    dimension_numbers: A `string`.
      a serialized xla::ConvolutionDimensionNumbers proto.
    precision_config: A `string`. a serialized xla::PrecisionConfig proto.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `lhs`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaConv", name,
        tld.op_callbacks, lhs, rhs, window_strides, padding, lhs_dilation,
        rhs_dilation, feature_group_count, "dimension_numbers",
        dimension_numbers, "precision_config", precision_config)
      return _result
    except _core._FallbackException:
      try:
        return xla_conv_eager_fallback(
            lhs, rhs, window_strides, padding, lhs_dilation, rhs_dilation,
            feature_group_count, dimension_numbers=dimension_numbers,
            precision_config=precision_config, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_conv, lhs=lhs, rhs=rhs, window_strides=window_strides,
                        padding=padding, lhs_dilation=lhs_dilation,
                        rhs_dilation=rhs_dilation,
                        feature_group_count=feature_group_count,
                        dimension_numbers=dimension_numbers,
                        precision_config=precision_config, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  dimension_numbers = _execute.make_str(dimension_numbers, "dimension_numbers")
  precision_config = _execute.make_str(precision_config, "precision_config")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaConv", lhs=lhs, rhs=rhs, window_strides=window_strides,
                   padding=padding, lhs_dilation=lhs_dilation,
                   rhs_dilation=rhs_dilation,
                   feature_group_count=feature_group_count,
                   dimension_numbers=dimension_numbers,
                   precision_config=precision_config, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_conv, lhs=lhs, rhs=rhs, window_strides=window_strides,
                    padding=padding, lhs_dilation=lhs_dilation,
                    rhs_dilation=rhs_dilation,
                    feature_group_count=feature_group_count,
                    dimension_numbers=dimension_numbers,
                    precision_config=precision_config, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tindices",
              _op._get_attr_type("Tindices"), "dimension_numbers",
              _op.get_attr("dimension_numbers"), "precision_config",
              _op.get_attr("precision_config"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaConv", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaConv = tf_export("raw_ops.XlaConv")(_ops.to_raw_op(xla_conv))


def xla_conv_eager_fallback(lhs, rhs, window_strides, padding, lhs_dilation, rhs_dilation, feature_group_count, dimension_numbers, precision_config, name, ctx):
  dimension_numbers = _execute.make_str(dimension_numbers, "dimension_numbers")
  precision_config = _execute.make_str(precision_config, "precision_config")
  _attr_T, _inputs_T = _execute.args_to_matching_eager([lhs, rhs], ctx)
  (lhs, rhs) = _inputs_T
  _attr_Tindices, _inputs_Tindices = _execute.args_to_matching_eager([window_strides, padding, lhs_dilation, rhs_dilation, feature_group_count], ctx)
  (window_strides, padding, lhs_dilation, rhs_dilation, feature_group_count) = _inputs_Tindices
  _inputs_flat = [lhs, rhs, window_strides, padding, lhs_dilation, rhs_dilation, feature_group_count]
  _attrs = ("T", _attr_T, "Tindices", _attr_Tindices, "dimension_numbers",
  dimension_numbers, "precision_config", precision_config)
  _result = _execute.execute(b"XlaConv", 1, inputs=_inputs_flat, attrs=_attrs,
                             ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaConv", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_dequantize')
def xla_dequantize(input, min_range, max_range, mode, transpose_output, name=None):
  r"""Takes the packed uint32 input and unpacks the input to uint8 to do

  Dequantization on deivce.

  Args:
    input: A `Tensor` of type `uint32`.
      Input tensors whose types is uint32, shape is [d0, ..., dn].
    min_range: A `float`.
      The minimum scalar value possibly produced for the input.
    max_range: A `float`.
      The maximum scalar value possibly produced for the input.
    mode: A `string`.
      String to determine the dequantize mode in {"MIN_COMBINED", "MIN_FIRST", "SCALED"}.
    transpose_output: A `bool`.
      Boolean to determine if output is transposed. transpose_output
      is faster when input is large and rank of input is higher than 1.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `bfloat16`.
    Output tensors whose types is bloat16. If transpose_output is true,
    output shape is [dn * 4, dn-1, ..., d1, d0]. If transpose_output
    is false, output shape is [d0,..., dn * 4].
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaDequantize", name,
        tld.op_callbacks, input, "min_range", min_range, "max_range",
        max_range, "mode", mode, "transpose_output", transpose_output)
      return _result
    except _core._FallbackException:
      try:
        return xla_dequantize_eager_fallback(
            input, min_range=min_range, max_range=max_range, mode=mode,
            transpose_output=transpose_output, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_dequantize, input=input, min_range=min_range,
                              max_range=max_range, mode=mode,
                              transpose_output=transpose_output, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  min_range = _execute.make_float(min_range, "min_range")
  max_range = _execute.make_float(max_range, "max_range")
  mode = _execute.make_str(mode, "mode")
  transpose_output = _execute.make_bool(transpose_output, "transpose_output")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaDequantize", input=input, min_range=min_range,
                         max_range=max_range, mode=mode,
                         transpose_output=transpose_output, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_dequantize, input=input, min_range=min_range,
                          max_range=max_range, mode=mode,
                          transpose_output=transpose_output, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("min_range", _op.get_attr("min_range"), "max_range",
              _op.get_attr("max_range"), "mode", _op.get_attr("mode"),
              "transpose_output", _op._get_attr_bool("transpose_output"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaDequantize", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaDequantize = tf_export("raw_ops.XlaDequantize")(_ops.to_raw_op(xla_dequantize))


def xla_dequantize_eager_fallback(input, min_range, max_range, mode, transpose_output, name, ctx):
  min_range = _execute.make_float(min_range, "min_range")
  max_range = _execute.make_float(max_range, "max_range")
  mode = _execute.make_str(mode, "mode")
  transpose_output = _execute.make_bool(transpose_output, "transpose_output")
  input = _ops.convert_to_tensor(input, _dtypes.uint32)
  _inputs_flat = [input]
  _attrs = ("min_range", min_range, "max_range", max_range, "mode", mode,
  "transpose_output", transpose_output)
  _result = _execute.execute(b"XlaDequantize", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaDequantize", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_dot')
def xla_dot(lhs, rhs, dimension_numbers, precision_config, name=None):
  r"""Wraps the XLA DotGeneral operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#dotgeneral
  .

  Args:
    lhs: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the LHS tensor
    rhs: A `Tensor`. Must have the same type as `lhs`. the RHS tensor
    dimension_numbers: A `string`.
      a serialized xla::DotDimensionNumbers proto.
    precision_config: A `string`. a serialized xla::PrecisionConfig proto.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `lhs`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaDot", name,
        tld.op_callbacks, lhs, rhs, "dimension_numbers", dimension_numbers,
        "precision_config", precision_config)
      return _result
    except _core._FallbackException:
      try:
        return xla_dot_eager_fallback(
            lhs, rhs, dimension_numbers=dimension_numbers,
            precision_config=precision_config, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_dot, lhs=lhs, rhs=rhs, dimension_numbers=dimension_numbers,
                       precision_config=precision_config, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  dimension_numbers = _execute.make_str(dimension_numbers, "dimension_numbers")
  precision_config = _execute.make_str(precision_config, "precision_config")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaDot", lhs=lhs, rhs=rhs, dimension_numbers=dimension_numbers,
                  precision_config=precision_config, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_dot, lhs=lhs, rhs=rhs, dimension_numbers=dimension_numbers,
                   precision_config=precision_config, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "dimension_numbers",
              _op.get_attr("dimension_numbers"), "precision_config",
              _op.get_attr("precision_config"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaDot", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaDot = tf_export("raw_ops.XlaDot")(_ops.to_raw_op(xla_dot))


def xla_dot_eager_fallback(lhs, rhs, dimension_numbers, precision_config, name, ctx):
  dimension_numbers = _execute.make_str(dimension_numbers, "dimension_numbers")
  precision_config = _execute.make_str(precision_config, "precision_config")
  _attr_T, _inputs_T = _execute.args_to_matching_eager([lhs, rhs], ctx)
  (lhs, rhs) = _inputs_T
  _inputs_flat = [lhs, rhs]
  _attrs = ("T", _attr_T, "dimension_numbers", dimension_numbers,
  "precision_config", precision_config)
  _result = _execute.execute(b"XlaDot", 1, inputs=_inputs_flat, attrs=_attrs,
                             ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaDot", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_dynamic_slice')
def xla_dynamic_slice(input, start_indices, size_indices, name=None):
  r"""Wraps the XLA DynamicSlice operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#dynamicslice
  .

  DynamicSlice extracts a sub-array from the input array at dynamic
  start_indices. The size of the slice in each dimension is passed in
  size_indices, which specify the end point of exclusive slice intervals in each
  dimension -- [start, start + size). The shape of start_indices must have rank 1,
  with dimension size equal to the rank of operand.

  Args:
    input: A `Tensor`. A `Tensor` of type T.
    start_indices: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      List of N integers containing the slice size for each
      dimension. Each value must be strictly greater than zero, and start + size
      must be less than or equal to the size of the dimension to avoid
      implementation defined behavior.
    size_indices: A `Tensor`. Must have the same type as `start_indices`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaDynamicSlice", name,
        tld.op_callbacks, input, start_indices, size_indices)
      return _result
    except _core._FallbackException:
      try:
        return xla_dynamic_slice_eager_fallback(
            input, start_indices, size_indices, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_dynamic_slice, input=input, start_indices=start_indices,
                                 size_indices=size_indices, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaDynamicSlice", input=input, start_indices=start_indices,
                           size_indices=size_indices, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_dynamic_slice, input=input, start_indices=start_indices,
                             size_indices=size_indices, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tindices",
              _op._get_attr_type("Tindices"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaDynamicSlice", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaDynamicSlice = tf_export("raw_ops.XlaDynamicSlice")(_ops.to_raw_op(xla_dynamic_slice))


def xla_dynamic_slice_eager_fallback(input, start_indices, size_indices, name, ctx):
  _attr_T, (input,) = _execute.args_to_matching_eager([input], ctx)
  _attr_Tindices, _inputs_Tindices = _execute.args_to_matching_eager([start_indices, size_indices], ctx)
  (start_indices, size_indices) = _inputs_Tindices
  _inputs_flat = [input, start_indices, size_indices]
  _attrs = ("T", _attr_T, "Tindices", _attr_Tindices)
  _result = _execute.execute(b"XlaDynamicSlice", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaDynamicSlice", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_dynamic_update_slice')
def xla_dynamic_update_slice(input, update, indices, name=None):
  r"""Wraps the XLA DynamicUpdateSlice operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#dynamicupdateslice
  .

  XlaDynamicUpdateSlice generates a result which is the value of the `input`
  operand, with a slice update overwritten at `indices`. The shape of `update`
  determines the shape of the sub-array of the result which is updated. The shape
  of indices must be rank == 1, with dimension size equal to the rank of `input`.

  Handling of out-of-bounds slice indices is implementation-defined.

  Args:
    input: A `Tensor`. A `Tensor` of type T.
    update: A `Tensor`. Must have the same type as `input`.
      A `Tensor` of type T. Same rank as `input`.
    indices: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      A vector of indices into `input`. Must have length equal to the rank of
      `input`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`. A `Tensor` of type T.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaDynamicUpdateSlice", name,
        tld.op_callbacks, input, update, indices)
      return _result
    except _core._FallbackException:
      try:
        return xla_dynamic_update_slice_eager_fallback(
            input, update, indices, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_dynamic_update_slice, input=input, update=update,
                                        indices=indices, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaDynamicUpdateSlice", input=input, update=update, indices=indices,
                                 name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_dynamic_update_slice, input=input, update=update,
                                    indices=indices, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tindices",
              _op._get_attr_type("Tindices"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaDynamicUpdateSlice", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaDynamicUpdateSlice = tf_export("raw_ops.XlaDynamicUpdateSlice")(_ops.to_raw_op(xla_dynamic_update_slice))


def xla_dynamic_update_slice_eager_fallback(input, update, indices, name, ctx):
  _attr_T, _inputs_T = _execute.args_to_matching_eager([input, update], ctx)
  (input, update) = _inputs_T
  _attr_Tindices, (indices,) = _execute.args_to_matching_eager([indices], ctx)
  _inputs_flat = [input, update, indices]
  _attrs = ("T", _attr_T, "Tindices", _attr_Tindices)
  _result = _execute.execute(b"XlaDynamicUpdateSlice", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaDynamicUpdateSlice", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_einsum')
def xla_einsum(a, b, equation, name=None):
  r"""An op which supports basic einsum op with 2 inputs and 1 output.

  This op has better TPU performnce since it doesn't have explicitly reshape and
  transpose operations as tf.einsum does.

  Args:
    a: A `Tensor`. Must be one of the following types: `complex64`, `bfloat16`, `float32`.
    b: A `Tensor`. Must have the same type as `a`.
    equation: A `string`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `a`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaEinsum", name,
        tld.op_callbacks, a, b, "equation", equation)
      return _result
    except _core._FallbackException:
      try:
        return xla_einsum_eager_fallback(
            a, b, equation=equation, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_einsum, a=a, b=b, equation=equation, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  equation = _execute.make_str(equation, "equation")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaEinsum", a=a, b=b, equation=equation, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_einsum, a=a, b=b, equation=equation, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("equation", _op.get_attr("equation"), "T",
              _op._get_attr_type("T"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaEinsum", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaEinsum = tf_export("raw_ops.XlaEinsum")(_ops.to_raw_op(xla_einsum))


def xla_einsum_eager_fallback(a, b, equation, name, ctx):
  equation = _execute.make_str(equation, "equation")
  _attr_T, _inputs_T = _execute.args_to_matching_eager([a, b], ctx)
  (a, b) = _inputs_T
  _inputs_flat = [a, b]
  _attrs = ("equation", equation, "T", _attr_T)
  _result = _execute.execute(b"XlaEinsum", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaEinsum", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_if')
def xla_if(cond, inputs, then_branch, else_branch, Tout, name=None):
  r"""output = cond ? then_branch(inputs) : else_branch(inputs).

  Args:
    cond: A `Tensor`. A boolean scalar.
    inputs: A list of `Tensor` objects. A list of input tensors.
    then_branch: A function decorated with @Defun.
      A function takes 'inputs' and returns a list of tensors,
      whose types are the same as what else_branch returns.
    else_branch: A function decorated with @Defun.
      A function takes 'inputs' and returns a list of tensors.
      whose types are the same as what then_branch returns.
    Tout: A list of `tf.DTypes`.
    name: A name for the operation (optional).

  Returns:
    A list of `Tensor` objects of type `Tout`.
    A list of tensors returned by either then_branch(inputs) or
    else_branch(inputs). The input shapes of the then_branch and
    else_branch must match.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaIf", name,
        tld.op_callbacks, cond, inputs, "then_branch", then_branch,
        "else_branch", else_branch, "Tout", Tout)
      return _result
    except _core._FallbackException:
      try:
        return xla_if_eager_fallback(
            cond, inputs, then_branch=then_branch, else_branch=else_branch,
            Tout=Tout, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_if, cond=cond, inputs=inputs, then_branch=then_branch,
                      else_branch=else_branch, Tout=Tout, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  if not isinstance(Tout, (list, tuple)):
    raise TypeError(
        "Expected list for 'Tout' argument to "
        "'xla_if' Op, not %r." % Tout)
  Tout = [_execute.make_type(_t, "Tout") for _t in Tout]
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaIf", cond=cond, inputs=inputs, then_branch=then_branch,
                 else_branch=else_branch, Tout=Tout, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_if, cond=cond, inputs=inputs, then_branch=then_branch,
                  else_branch=else_branch, Tout=Tout, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if not _result:
    return _op
  if _execute.must_record_gradient():
    _attrs = ("Tcond", _op._get_attr_type("Tcond"), "then_branch",
              _op.get_attr("then_branch"), "else_branch",
              _op.get_attr("else_branch"), "Tin", _op.get_attr("Tin"), "Tout",
              _op.get_attr("Tout"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaIf", _inputs_flat, _attrs, _result)
  return _result

XlaIf = tf_export("raw_ops.XlaIf")(_ops.to_raw_op(xla_if))


def xla_if_eager_fallback(cond, inputs, then_branch, else_branch, Tout, name, ctx):
  if not isinstance(Tout, (list, tuple)):
    raise TypeError(
        "Expected list for 'Tout' argument to "
        "'xla_if' Op, not %r." % Tout)
  Tout = [_execute.make_type(_t, "Tout") for _t in Tout]
  _attr_Tcond, (cond,) = _execute.args_to_matching_eager([cond], ctx)
  _attr_Tin, inputs = _execute.convert_to_mixed_eager_tensors(inputs, ctx)
  _inputs_flat = [cond] + list(inputs)
  _attrs = ("Tcond", _attr_Tcond, "then_branch", then_branch, "else_branch",
  else_branch, "Tin", _attr_Tin, "Tout", Tout)
  _result = _execute.execute(b"XlaIf", len(Tout), inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaIf", _inputs_flat, _attrs, _result)
  return _result

_XlaKeyValueSortOutput = collections.namedtuple(
    "XlaKeyValueSort",
    ["sorted_keys", "sorted_values"])


@_dispatch.add_dispatch_list
@tf_export('xla_key_value_sort')
def xla_key_value_sort(keys, values, name=None):
  r"""Wraps the XLA Sort operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#sort
  .

  Sorts a tensor. Currently only sorts in ascending order are supported.

  Args:
    keys: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `int64`, `bfloat16`, `uint16`, `half`, `uint32`, `uint64`.
      A `Tensor` of type K.
    values: A `Tensor`. A `Tensor` of type V.
    name: A name for the operation (optional).

  Returns:
    A tuple of `Tensor` objects (sorted_keys, sorted_values).

    sorted_keys: A `Tensor`. Has the same type as `keys`. A `Tensor` of type K.
    sorted_values: A `Tensor`. Has the same type as `values`. A `Tensor` of type V.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaKeyValueSort", name,
        tld.op_callbacks, keys, values)
      _result = _XlaKeyValueSortOutput._make(_result)
      return _result
    except _core._FallbackException:
      try:
        return xla_key_value_sort_eager_fallback(
            keys, values, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_key_value_sort, keys=keys, values=values, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaKeyValueSort", keys=keys, values=values, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_key_value_sort, keys=keys, values=values, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("K", _op._get_attr_type("K"), "V", _op._get_attr_type("V"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaKeyValueSort", _inputs_flat, _attrs, _result)
  _result = _XlaKeyValueSortOutput._make(_result)
  return _result

XlaKeyValueSort = tf_export("raw_ops.XlaKeyValueSort")(_ops.to_raw_op(xla_key_value_sort))


def xla_key_value_sort_eager_fallback(keys, values, name, ctx):
  _attr_K, (keys,) = _execute.args_to_matching_eager([keys], ctx)
  _attr_V, (values,) = _execute.args_to_matching_eager([values], ctx)
  _inputs_flat = [keys, values]
  _attrs = ("K", _attr_K, "V", _attr_V)
  _result = _execute.execute(b"XlaKeyValueSort", 2, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaKeyValueSort", _inputs_flat, _attrs, _result)
  _result = _XlaKeyValueSortOutput._make(_result)
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_pad')
def xla_pad(input, padding_value, padding_low, padding_high, padding_interior, name=None):
  r"""Wraps the XLA Pad operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#pad
  .

  Args:
    input: A `Tensor`. A `Tensor` of type T.
    padding_value: A `Tensor`. Must have the same type as `input`.
      A scalar `Tensor` of type T.
    padding_low: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      the padding to apply at the start of each input dimensions
    padding_high: A `Tensor`. Must have the same type as `padding_low`.
      the padding to apply at the end of each input dimension.
    padding_interior: A `Tensor`. Must have the same type as `padding_low`.
      the padding to apply between each input element.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`. A `Tensor` of type T.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaPad", name,
        tld.op_callbacks, input, padding_value, padding_low, padding_high,
        padding_interior)
      return _result
    except _core._FallbackException:
      try:
        return xla_pad_eager_fallback(
            input, padding_value, padding_low, padding_high, padding_interior,
            name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_pad, input=input, padding_value=padding_value,
                       padding_low=padding_low, padding_high=padding_high,
                       padding_interior=padding_interior, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaPad", input=input, padding_value=padding_value,
                  padding_low=padding_low, padding_high=padding_high,
                  padding_interior=padding_interior, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_pad, input=input, padding_value=padding_value,
                   padding_low=padding_low, padding_high=padding_high,
                   padding_interior=padding_interior, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tindices",
              _op._get_attr_type("Tindices"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaPad", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaPad = tf_export("raw_ops.XlaPad")(_ops.to_raw_op(xla_pad))


def xla_pad_eager_fallback(input, padding_value, padding_low, padding_high, padding_interior, name, ctx):
  _attr_T, _inputs_T = _execute.args_to_matching_eager([input, padding_value], ctx)
  (input, padding_value) = _inputs_T
  _attr_Tindices, _inputs_Tindices = _execute.args_to_matching_eager([padding_low, padding_high, padding_interior], ctx)
  (padding_low, padding_high, padding_interior) = _inputs_Tindices
  _inputs_flat = [input, padding_value, padding_low, padding_high, padding_interior]
  _attrs = ("T", _attr_T, "Tindices", _attr_Tindices)
  _result = _execute.execute(b"XlaPad", 1, inputs=_inputs_flat, attrs=_attrs,
                             ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaPad", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_recv')
def xla_recv(dtype, tensor_name, shape, name=None):
  r"""Receives the named tensor from another XLA computation. Wraps the XLA Recv

  operator documented at
   https://www.tensorflow.org/performance/xla/operation_semantics#recv .

  Args:
    dtype: A `tf.DType`. The type of the tensor.
    tensor_name: A `string`. A string key that identifies the channel.
    shape: A `tf.TensorShape` or list of `ints`. The shape of the tensor.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `dtype`. The tensor to receive.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaRecv", name,
        tld.op_callbacks, "dtype", dtype, "tensor_name", tensor_name, "shape",
        shape)
      return _result
    except _core._FallbackException:
      try:
        return xla_recv_eager_fallback(
            dtype=dtype, tensor_name=tensor_name, shape=shape, name=name,
            ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_recv, dtype=dtype, tensor_name=tensor_name, shape=shape,
                        name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  dtype = _execute.make_type(dtype, "dtype")
  tensor_name = _execute.make_str(tensor_name, "tensor_name")
  shape = _execute.make_shape(shape, "shape")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaRecv", dtype=dtype, tensor_name=tensor_name, shape=shape,
                   name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_recv, dtype=dtype, tensor_name=tensor_name, shape=shape,
                    name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("dtype", _op._get_attr_type("dtype"), "tensor_name",
              _op.get_attr("tensor_name"), "shape", _op.get_attr("shape"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaRecv", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaRecv = tf_export("raw_ops.XlaRecv")(_ops.to_raw_op(xla_recv))


def xla_recv_eager_fallback(dtype, tensor_name, shape, name, ctx):
  dtype = _execute.make_type(dtype, "dtype")
  tensor_name = _execute.make_str(tensor_name, "tensor_name")
  shape = _execute.make_shape(shape, "shape")
  _inputs_flat = []
  _attrs = ("dtype", dtype, "tensor_name", tensor_name, "shape", shape)
  _result = _execute.execute(b"XlaRecv", 1, inputs=_inputs_flat, attrs=_attrs,
                             ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaRecv", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_reduce')
def xla_reduce(input, init_value, dimensions_to_reduce, reducer, name=None):
  r"""Wraps the XLA Reduce operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#reduce .

  Args:
    input: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the input tensor
    init_value: A `Tensor`. Must have the same type as `input`.
      a scalar representing the initial value for the reduction
    dimensions_to_reduce: A list of `ints`.
      dimension numbers over which to reduce
    reducer: A function decorated with @Defun. a reducer function to apply
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaReduce", name,
        tld.op_callbacks, input, init_value, "dimensions_to_reduce",
        dimensions_to_reduce, "reducer", reducer)
      return _result
    except _core._FallbackException:
      try:
        return xla_reduce_eager_fallback(
            input, init_value, dimensions_to_reduce=dimensions_to_reduce,
            reducer=reducer, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_reduce, input=input, init_value=init_value,
                          dimensions_to_reduce=dimensions_to_reduce,
                          reducer=reducer, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  if not isinstance(dimensions_to_reduce, (list, tuple)):
    raise TypeError(
        "Expected list for 'dimensions_to_reduce' argument to "
        "'xla_reduce' Op, not %r." % dimensions_to_reduce)
  dimensions_to_reduce = [_execute.make_int(_i, "dimensions_to_reduce") for _i in dimensions_to_reduce]
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaReduce", input=input, init_value=init_value,
                     dimensions_to_reduce=dimensions_to_reduce,
                     reducer=reducer, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_reduce, input=input, init_value=init_value,
                      dimensions_to_reduce=dimensions_to_reduce,
                      reducer=reducer, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "dimensions_to_reduce",
              _op.get_attr("dimensions_to_reduce"), "reducer",
              _op.get_attr("reducer"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaReduce", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaReduce = tf_export("raw_ops.XlaReduce")(_ops.to_raw_op(xla_reduce))


def xla_reduce_eager_fallback(input, init_value, dimensions_to_reduce, reducer, name, ctx):
  if not isinstance(dimensions_to_reduce, (list, tuple)):
    raise TypeError(
        "Expected list for 'dimensions_to_reduce' argument to "
        "'xla_reduce' Op, not %r." % dimensions_to_reduce)
  dimensions_to_reduce = [_execute.make_int(_i, "dimensions_to_reduce") for _i in dimensions_to_reduce]
  _attr_T, _inputs_T = _execute.args_to_matching_eager([input, init_value], ctx)
  (input, init_value) = _inputs_T
  _inputs_flat = [input, init_value]
  _attrs = ("T", _attr_T, "dimensions_to_reduce", dimensions_to_reduce,
  "reducer", reducer)
  _result = _execute.execute(b"XlaReduce", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaReduce", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_reduce_window')
def xla_reduce_window(input, init_value, window_dimensions, window_strides, base_dilations, window_dilations, padding, computation, name=None):
  r"""Wraps the XLA ReduceWindow operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#reducewindow .

  Args:
    input: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the input tensor
    init_value: A `Tensor`. Must have the same type as `input`.
      a scalar representing the initial value for the reduction
    window_dimensions: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      the shape of the window
    window_strides: A `Tensor`. Must have the same type as `window_dimensions`.
      the inter-window strides
    base_dilations: A `Tensor`. Must have the same type as `window_dimensions`.
    window_dilations: A `Tensor`. Must have the same type as `window_dimensions`.
    padding: A `Tensor`. Must have the same type as `window_dimensions`.
      the padding to apply at the start and end of each input dimensions
    computation: A function decorated with @Defun. a reducer function to apply
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaReduceWindow", name,
        tld.op_callbacks, input, init_value, window_dimensions,
        window_strides, base_dilations, window_dilations, padding,
        "computation", computation)
      return _result
    except _core._FallbackException:
      try:
        return xla_reduce_window_eager_fallback(
            input, init_value, window_dimensions, window_strides,
            base_dilations, window_dilations, padding,
            computation=computation, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_reduce_window, input=input, init_value=init_value,
                                 window_dimensions=window_dimensions,
                                 window_strides=window_strides,
                                 base_dilations=base_dilations,
                                 window_dilations=window_dilations,
                                 padding=padding, computation=computation,
                                 name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaReduceWindow", input=input, init_value=init_value,
                           window_dimensions=window_dimensions,
                           window_strides=window_strides,
                           base_dilations=base_dilations,
                           window_dilations=window_dilations, padding=padding,
                           computation=computation, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_reduce_window, input=input, init_value=init_value,
                             window_dimensions=window_dimensions,
                             window_strides=window_strides,
                             base_dilations=base_dilations,
                             window_dilations=window_dilations,
                             padding=padding, computation=computation,
                             name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tindices",
              _op._get_attr_type("Tindices"), "computation",
              _op.get_attr("computation"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaReduceWindow", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaReduceWindow = tf_export("raw_ops.XlaReduceWindow")(_ops.to_raw_op(xla_reduce_window))


def xla_reduce_window_eager_fallback(input, init_value, window_dimensions, window_strides, base_dilations, window_dilations, padding, computation, name, ctx):
  _attr_T, _inputs_T = _execute.args_to_matching_eager([input, init_value], ctx)
  (input, init_value) = _inputs_T
  _attr_Tindices, _inputs_Tindices = _execute.args_to_matching_eager([window_dimensions, window_strides, base_dilations, window_dilations, padding], ctx)
  (window_dimensions, window_strides, base_dilations, window_dilations, padding) = _inputs_Tindices
  _inputs_flat = [input, init_value, window_dimensions, window_strides, base_dilations, window_dilations, padding]
  _attrs = ("T", _attr_T, "Tindices", _attr_Tindices, "computation",
  computation)
  _result = _execute.execute(b"XlaReduceWindow", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaReduceWindow", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_replica_id')
def xla_replica_id(name=None):
  r"""Replica ID.

  Args:
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `int32`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaReplicaId", name,
        tld.op_callbacks)
      return _result
    except _core._FallbackException:
      try:
        return xla_replica_id_eager_fallback(
            name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_replica_id, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaReplicaId", name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_replica_id, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ()
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaReplicaId", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaReplicaId = tf_export("raw_ops.XlaReplicaId")(_ops.to_raw_op(xla_replica_id))


def xla_replica_id_eager_fallback(name, ctx):
  _inputs_flat = []
  _attrs = None
  _result = _execute.execute(b"XlaReplicaId", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaReplicaId", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_select_and_scatter')
def xla_select_and_scatter(operand, window_dimensions, window_strides, padding, source, init_value, select, scatter, name=None):
  r"""Wraps the XLA SelectAndScatter operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#selectandscatter
  .

  Args:
    operand: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the input tensor
    window_dimensions: A `Tensor`. Must be one of the following types: `int32`, `int64`.
      the shape of the window
    window_strides: A `Tensor`. Must have the same type as `window_dimensions`.
      the inter-window strides
    padding: A `Tensor`. Must have the same type as `window_dimensions`.
      the padding to apply at the start and end of each input dimensions
    source: A `Tensor`. Must have the same type as `operand`.
      a tensor of values to scatter
    init_value: A `Tensor`. Must have the same type as `operand`.
      a scalar representing the initial value for the output tensor
    select: A function decorated with @Defun. a selection function to apply
    scatter: A function decorated with @Defun. a scatter function to apply
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `operand`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaSelectAndScatter", name,
        tld.op_callbacks, operand, window_dimensions, window_strides, padding,
        source, init_value, "select", select, "scatter", scatter)
      return _result
    except _core._FallbackException:
      try:
        return xla_select_and_scatter_eager_fallback(
            operand, window_dimensions, window_strides, padding, source,
            init_value, select=select, scatter=scatter, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_select_and_scatter, operand=operand,
                                      window_dimensions=window_dimensions,
                                      window_strides=window_strides,
                                      padding=padding, source=source,
                                      init_value=init_value, select=select,
                                      scatter=scatter, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaSelectAndScatter", operand=operand,
                               window_dimensions=window_dimensions,
                               window_strides=window_strides, padding=padding,
                               source=source, init_value=init_value,
                               select=select, scatter=scatter, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_select_and_scatter, operand=operand,
                                  window_dimensions=window_dimensions,
                                  window_strides=window_strides,
                                  padding=padding, source=source,
                                  init_value=init_value, select=select,
                                  scatter=scatter, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "Tindices",
              _op._get_attr_type("Tindices"), "select",
              _op.get_attr("select"), "scatter", _op.get_attr("scatter"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaSelectAndScatter", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaSelectAndScatter = tf_export("raw_ops.XlaSelectAndScatter")(_ops.to_raw_op(xla_select_and_scatter))


def xla_select_and_scatter_eager_fallback(operand, window_dimensions, window_strides, padding, source, init_value, select, scatter, name, ctx):
  _attr_T, _inputs_T = _execute.args_to_matching_eager([operand, source, init_value], ctx)
  (operand, source, init_value) = _inputs_T
  _attr_Tindices, _inputs_Tindices = _execute.args_to_matching_eager([window_dimensions, window_strides, padding], ctx)
  (window_dimensions, window_strides, padding) = _inputs_Tindices
  _inputs_flat = [operand, window_dimensions, window_strides, padding, source, init_value]
  _attrs = ("T", _attr_T, "Tindices", _attr_Tindices, "select", select,
  "scatter", scatter)
  _result = _execute.execute(b"XlaSelectAndScatter", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaSelectAndScatter", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

_XlaSelfAdjointEigOutput = collections.namedtuple(
    "XlaSelfAdjointEig",
    ["w", "v"])


@_dispatch.add_dispatch_list
@tf_export('xla_self_adjoint_eig')
def xla_self_adjoint_eig(a, lower, max_iter, epsilon, name=None):
  r"""Computes the eigen decomposition of a batch of self-adjoint matrices

  (Note: Only real inputs are supported).

  Computes the eigenvalues and eigenvectors of the innermost N-by-N matrices in
  tensor such that tensor[...,:,:] * v[..., :,i] = e[..., i] * v[...,:,i], for
  i=0...N-1.

  Args:
    a: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the input tensor.
    lower: A `bool`.
      a boolean specifies whether the calculation is done with the lower
      triangular part or the upper triangular part.
    max_iter: An `int`.
      maximum number of sweep update, i.e., the whole lower triangular
      part or upper triangular part based on parameter lower. Heuristically, it has
      been argued that approximatly logN sweeps are needed in practice (Ref: Golub &
      van Loan "Matrix Computation").
    epsilon: A `float`. the tolerance ratio.
    name: A name for the operation (optional).

  Returns:
    A tuple of `Tensor` objects (w, v).

    w: A `Tensor`. Has the same type as `a`. The eigenvalues in ascending order, each repeated according to its
      multiplicity.
    v: A `Tensor`. Has the same type as `a`. The column v[..., :, i] is the normalized eigenvector corresponding to the
      eigenvalue w[..., i].
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaSelfAdjointEig", name,
        tld.op_callbacks, a, "lower", lower, "max_iter", max_iter, "epsilon",
        epsilon)
      _result = _XlaSelfAdjointEigOutput._make(_result)
      return _result
    except _core._FallbackException:
      try:
        return xla_self_adjoint_eig_eager_fallback(
            a, lower=lower, max_iter=max_iter, epsilon=epsilon, name=name,
            ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_self_adjoint_eig, a=a, lower=lower, max_iter=max_iter,
                                    epsilon=epsilon, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  lower = _execute.make_bool(lower, "lower")
  max_iter = _execute.make_int(max_iter, "max_iter")
  epsilon = _execute.make_float(epsilon, "epsilon")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaSelfAdjointEig", a=a, lower=lower, max_iter=max_iter,
                             epsilon=epsilon, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_self_adjoint_eig, a=a, lower=lower, max_iter=max_iter,
                                epsilon=epsilon, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("lower", _op._get_attr_bool("lower"), "max_iter",
              _op._get_attr_int("max_iter"), "epsilon",
              _op.get_attr("epsilon"), "T", _op._get_attr_type("T"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaSelfAdjointEig", _inputs_flat, _attrs, _result)
  _result = _XlaSelfAdjointEigOutput._make(_result)
  return _result

XlaSelfAdjointEig = tf_export("raw_ops.XlaSelfAdjointEig")(_ops.to_raw_op(xla_self_adjoint_eig))


def xla_self_adjoint_eig_eager_fallback(a, lower, max_iter, epsilon, name, ctx):
  lower = _execute.make_bool(lower, "lower")
  max_iter = _execute.make_int(max_iter, "max_iter")
  epsilon = _execute.make_float(epsilon, "epsilon")
  _attr_T, (a,) = _execute.args_to_matching_eager([a], ctx)
  _inputs_flat = [a]
  _attrs = ("lower", lower, "max_iter", max_iter, "epsilon", epsilon, "T",
  _attr_T)
  _result = _execute.execute(b"XlaSelfAdjointEig", 2, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaSelfAdjointEig", _inputs_flat, _attrs, _result)
  _result = _XlaSelfAdjointEigOutput._make(_result)
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_send')
def xla_send(tensor, tensor_name, name=None):
  r"""Sends the named tensor to another XLA computation. Wraps the XLA Send operator

  documented at
   https://www.tensorflow.org/performance/xla/operation_semantics#send .

  Args:
    tensor: A `Tensor`. The tensor to send.
    tensor_name: A `string`. A string key that identifies the channel.
    name: A name for the operation (optional).

  Returns:
    The created Operation.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaSend", name,
        tld.op_callbacks, tensor, "tensor_name", tensor_name)
      return _result
    except _core._FallbackException:
      try:
        return xla_send_eager_fallback(
            tensor, tensor_name=tensor_name, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_send, tensor=tensor, tensor_name=tensor_name, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  tensor_name = _execute.make_str(tensor_name, "tensor_name")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaSend", tensor=tensor, tensor_name=tensor_name, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_send, tensor=tensor, tensor_name=tensor_name, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  return _op
XlaSend = tf_export("raw_ops.XlaSend")(_ops.to_raw_op(xla_send))


def xla_send_eager_fallback(tensor, tensor_name, name, ctx):
  tensor_name = _execute.make_str(tensor_name, "tensor_name")
  _attr_T, (tensor,) = _execute.args_to_matching_eager([tensor], ctx)
  _inputs_flat = [tensor]
  _attrs = ("T", _attr_T, "tensor_name", tensor_name)
  _result = _execute.execute(b"XlaSend", 0, inputs=_inputs_flat, attrs=_attrs,
                             ctx=ctx, name=name)
  _result = None
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_sharding')
def xla_sharding(input, name=None):
  r"""An op which shards the input based on the given sharding attribute.

  Args:
    input: A `Tensor`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaSharding", name,
        tld.op_callbacks, input)
      return _result
    except _core._FallbackException:
      try:
        return xla_sharding_eager_fallback(
            input, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_sharding, input=input, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaSharding", input=input, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_sharding, input=input, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaSharding", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaSharding = tf_export("raw_ops.XlaSharding")(_ops.to_raw_op(xla_sharding))


def xla_sharding_eager_fallback(input, name, ctx):
  _attr_T, (input,) = _execute.args_to_matching_eager([input], ctx)
  _inputs_flat = [input]
  _attrs = ("T", _attr_T)
  _result = _execute.execute(b"XlaSharding", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaSharding", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_sort')
def xla_sort(input, name=None):
  r"""Wraps the XLA Sort operator, documented at

   https://www.tensorflow.org/performance/xla/operation_semantics#sort
  .

  Sorts a tensor. Currently only sorts in ascending order are supported.

  Args:
    input: A `Tensor`. A `Tensor` of type T.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`. A `Tensor` of type T.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaSort", name,
        tld.op_callbacks, input)
      return _result
    except _core._FallbackException:
      try:
        return xla_sort_eager_fallback(
            input, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_sort, input=input, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaSort", input=input, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_sort, input=input, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaSort", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

XlaSort = tf_export("raw_ops.XlaSort")(_ops.to_raw_op(xla_sort))


def xla_sort_eager_fallback(input, name, ctx):
  _attr_T, (input,) = _execute.args_to_matching_eager([input], ctx)
  _inputs_flat = [input]
  _attrs = ("T", _attr_T)
  _result = _execute.execute(b"XlaSort", 1, inputs=_inputs_flat, attrs=_attrs,
                             ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaSort", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

_XlaSvdOutput = collections.namedtuple(
    "XlaSvd",
    ["s", "u", "v"])


@_dispatch.add_dispatch_list
@tf_export('xla_svd')
def xla_svd(a, max_iter, epsilon, precision_config, name=None):
  r"""Computes the eigen decomposition of a batch of self-adjoint matrices

  (Note: Only real inputs are supported).

  Computes the eigenvalues and eigenvectors of the innermost M-by-N matrices in
  tensor such that tensor[...,:,:] = u[..., :, :] * Diag(s[..., :]) * Transpose(v[...,:,:]).

  Args:
    a: A `Tensor`. Must be one of the following types: `float32`, `float64`, `int32`, `uint8`, `int16`, `int8`, `complex64`, `int64`, `qint8`, `quint8`, `qint32`, `bfloat16`, `uint16`, `complex128`, `half`, `uint32`, `uint64`.
      the input tensor.
    max_iter: An `int`.
      maximum number of sweep update, i.e., the whole lower triangular
      part or upper triangular part based on parameter lower. Heuristically, it has
      been argued that approximatly log(min (M, N)) sweeps are needed in practice
      (Ref: Golub & van Loan "Matrix Computation").
    epsilon: A `float`. the tolerance ratio.
    precision_config: A `string`. a serialized xla::PrecisionConfig proto.
    name: A name for the operation (optional).

  Returns:
    A tuple of `Tensor` objects (s, u, v).

    s: A `Tensor`. Has the same type as `a`. Singular values. The values are sorted in reverse order of magnitude, so
      s[..., 0] is the largest value, s[..., 1] is the second largest, etc.
    u: A `Tensor`. Has the same type as `a`. Left singular vectors.
    v: A `Tensor`. Has the same type as `a`. Right singular vectors.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaSvd", name,
        tld.op_callbacks, a, "max_iter", max_iter, "epsilon", epsilon,
        "precision_config", precision_config)
      _result = _XlaSvdOutput._make(_result)
      return _result
    except _core._FallbackException:
      try:
        return xla_svd_eager_fallback(
            a, max_iter=max_iter, epsilon=epsilon,
            precision_config=precision_config, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_svd, a=a, max_iter=max_iter, epsilon=epsilon,
                       precision_config=precision_config, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  max_iter = _execute.make_int(max_iter, "max_iter")
  epsilon = _execute.make_float(epsilon, "epsilon")
  precision_config = _execute.make_str(precision_config, "precision_config")
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaSvd", a=a, max_iter=max_iter, epsilon=epsilon,
                  precision_config=precision_config, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_svd, a=a, max_iter=max_iter, epsilon=epsilon,
                   precision_config=precision_config, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("max_iter", _op._get_attr_int("max_iter"), "epsilon",
              _op.get_attr("epsilon"), "precision_config",
              _op.get_attr("precision_config"), "T", _op._get_attr_type("T"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaSvd", _inputs_flat, _attrs, _result)
  _result = _XlaSvdOutput._make(_result)
  return _result

XlaSvd = tf_export("raw_ops.XlaSvd")(_ops.to_raw_op(xla_svd))


def xla_svd_eager_fallback(a, max_iter, epsilon, precision_config, name, ctx):
  max_iter = _execute.make_int(max_iter, "max_iter")
  epsilon = _execute.make_float(epsilon, "epsilon")
  precision_config = _execute.make_str(precision_config, "precision_config")
  _attr_T, (a,) = _execute.args_to_matching_eager([a], ctx)
  _inputs_flat = [a]
  _attrs = ("max_iter", max_iter, "epsilon", epsilon, "precision_config",
  precision_config, "T", _attr_T)
  _result = _execute.execute(b"XlaSvd", 3, inputs=_inputs_flat, attrs=_attrs,
                             ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaSvd", _inputs_flat, _attrs, _result)
  _result = _XlaSvdOutput._make(_result)
  return _result


@_dispatch.add_dispatch_list
@tf_export('xla_while')
def xla_while(input, cond, body, name=None):
  r"""output = input; While (Cond(output)) { output = Body(output) }

  Args:
    input: A list of `Tensor` objects.
      A list of input tensors whose types are T.
    cond: A function decorated with @Defun.
      A function takes 'input' and returns a tensor.  If the tensor is
      a scalar of non-boolean, the scalar is converted to a boolean
      according to the following rule: if the scalar is a numerical
      value, non-zero means True and zero means False; if the scalar is
      a string, non-empty means True and empty means False. If the
      tensor is not a scalar, non-emptiness means True and False
      otherwise.
    body: A function decorated with @Defun.
      A function that takes a list of tensors and returns another
      list of tensors. Both lists have the same types as specified by T.
    name: A name for the operation (optional).

  Returns:
    A list of `Tensor` objects. Has the same type as `input`.
    A list of output tensors whose types are T.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "XlaWhile", name,
        tld.op_callbacks, input, "cond", cond, "body", body)
      return _result
    except _core._FallbackException:
      try:
        return xla_while_eager_fallback(
            input, cond=cond, body=body, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
      except (TypeError, ValueError):
        result = _dispatch.dispatch(
              xla_while, input=input, cond=cond, body=body, name=name)
        if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
          return result
        raise
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  try:
    _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "XlaWhile", input=input, cond=cond, body=body, name=name)
  except (TypeError, ValueError):
    result = _dispatch.dispatch(
          xla_while, input=input, cond=cond, body=body, name=name)
    if result is not _dispatch.OpDispatcher.NOT_SUPPORTED:
      return result
    raise
  _result = _outputs[:]
  if not _result:
    return _op
  if _execute.must_record_gradient():
    _attrs = ("T", _op.get_attr("T"), "cond", _op.get_attr("cond"), "body",
              _op.get_attr("body"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "XlaWhile", _inputs_flat, _attrs, _result)
  return _result

XlaWhile = tf_export("raw_ops.XlaWhile")(_ops.to_raw_op(xla_while))


def xla_while_eager_fallback(input, cond, body, name, ctx):
  _attr_T, input = _execute.convert_to_mixed_eager_tensors(input, ctx)
  _inputs_flat = list(input)
  _attrs = ("T", _attr_T, "cond", cond, "body", body)
  _result = _execute.execute(b"XlaWhile", len(input), inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "XlaWhile", _inputs_flat, _attrs, _result)
  return _result

