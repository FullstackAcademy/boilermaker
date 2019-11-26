"""Python wrappers around TensorFlow ops.

This file is MACHINE GENERATED! Do not edit.
Original C++ source file: collective_ops.cc
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


def collective_bcast_recv(T, group_size, group_key, instance_key, shape, communication_hint="auto", name=None):
  r"""Receives a tensor value broadcast from another device.

  Args:
    T: A `tf.DType` from: `tf.float32, tf.half, tf.float64, tf.int32, tf.int64`.
    group_size: An `int`.
    group_key: An `int`.
    instance_key: An `int`.
    shape: A `tf.TensorShape` or list of `ints`.
    communication_hint: An optional `string`. Defaults to `"auto"`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor` of type `T`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "CollectiveBcastRecv", name,
        tld.op_callbacks, "T", T, "group_size", group_size, "group_key",
        group_key, "instance_key", instance_key, "shape", shape,
        "communication_hint", communication_hint)
      return _result
    except _core._FallbackException:
      try:
        return collective_bcast_recv_eager_fallback(
            T=T, group_size=group_size, group_key=group_key,
            instance_key=instance_key, shape=shape,
            communication_hint=communication_hint, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  T = _execute.make_type(T, "T")
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  shape = _execute.make_shape(shape, "shape")
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "CollectiveBcastRecv", T=T, group_size=group_size,
                               group_key=group_key, instance_key=instance_key,
                               shape=shape,
                               communication_hint=communication_hint,
                               name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "group_size",
              _op._get_attr_int("group_size"), "group_key",
              _op._get_attr_int("group_key"), "instance_key",
              _op._get_attr_int("instance_key"), "shape",
              _op.get_attr("shape"), "communication_hint",
              _op.get_attr("communication_hint"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "CollectiveBcastRecv", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

CollectiveBcastRecv = tf_export("raw_ops.CollectiveBcastRecv")(_ops.to_raw_op(collective_bcast_recv))


def collective_bcast_recv_eager_fallback(T, group_size, group_key, instance_key, shape, communication_hint, name, ctx):
  T = _execute.make_type(T, "T")
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  shape = _execute.make_shape(shape, "shape")
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _inputs_flat = []
  _attrs = ("T", T, "group_size", group_size, "group_key", group_key,
  "instance_key", instance_key, "shape", shape, "communication_hint",
  communication_hint)
  _result = _execute.execute(b"CollectiveBcastRecv", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "CollectiveBcastRecv", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def collective_bcast_send(input, group_size, group_key, instance_key, shape, communication_hint="auto", name=None):
  r"""Broadcasts a tensor value to one or more other devices.

  Args:
    input: A `Tensor`. Must be one of the following types: `float32`, `half`, `float64`, `int32`, `int64`.
    group_size: An `int`.
    group_key: An `int`.
    instance_key: An `int`.
    shape: A `tf.TensorShape` or list of `ints`.
    communication_hint: An optional `string`. Defaults to `"auto"`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "CollectiveBcastSend", name,
        tld.op_callbacks, input, "group_size", group_size, "group_key",
        group_key, "instance_key", instance_key, "shape", shape,
        "communication_hint", communication_hint)
      return _result
    except _core._FallbackException:
      try:
        return collective_bcast_send_eager_fallback(
            input, group_size=group_size, group_key=group_key,
            instance_key=instance_key, shape=shape,
            communication_hint=communication_hint, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  shape = _execute.make_shape(shape, "shape")
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "CollectiveBcastSend", input=input, group_size=group_size,
                               group_key=group_key, instance_key=instance_key,
                               shape=shape,
                               communication_hint=communication_hint,
                               name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "group_size",
              _op._get_attr_int("group_size"), "group_key",
              _op._get_attr_int("group_key"), "instance_key",
              _op._get_attr_int("instance_key"), "shape",
              _op.get_attr("shape"), "communication_hint",
              _op.get_attr("communication_hint"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "CollectiveBcastSend", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

CollectiveBcastSend = tf_export("raw_ops.CollectiveBcastSend")(_ops.to_raw_op(collective_bcast_send))


def collective_bcast_send_eager_fallback(input, group_size, group_key, instance_key, shape, communication_hint, name, ctx):
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  shape = _execute.make_shape(shape, "shape")
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _attr_T, (input,) = _execute.args_to_matching_eager([input], ctx)
  _inputs_flat = [input]
  _attrs = ("T", _attr_T, "group_size", group_size, "group_key", group_key,
  "instance_key", instance_key, "shape", shape, "communication_hint",
  communication_hint)
  _result = _execute.execute(b"CollectiveBcastSend", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "CollectiveBcastSend", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def collective_gather(input, group_size, group_key, instance_key, shape, communication_hint="auto", name=None):
  r"""Mutually accumulates multiple tensors of identical type and shape.

  Args:
    input: A `Tensor`. Must be one of the following types: `float32`, `half`, `float64`, `int32`, `int64`.
    group_size: An `int`.
    group_key: An `int`.
    instance_key: An `int`.
    shape: A `tf.TensorShape` or list of `ints`.
    communication_hint: An optional `string`. Defaults to `"auto"`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "CollectiveGather", name,
        tld.op_callbacks, input, "group_size", group_size, "group_key",
        group_key, "instance_key", instance_key, "shape", shape,
        "communication_hint", communication_hint)
      return _result
    except _core._FallbackException:
      try:
        return collective_gather_eager_fallback(
            input, group_size=group_size, group_key=group_key,
            instance_key=instance_key, shape=shape,
            communication_hint=communication_hint, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  shape = _execute.make_shape(shape, "shape")
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "CollectiveGather", input=input, group_size=group_size,
                            group_key=group_key, instance_key=instance_key,
                            shape=shape,
                            communication_hint=communication_hint, name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "group_size",
              _op._get_attr_int("group_size"), "group_key",
              _op._get_attr_int("group_key"), "instance_key",
              _op._get_attr_int("instance_key"), "shape",
              _op.get_attr("shape"), "communication_hint",
              _op.get_attr("communication_hint"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "CollectiveGather", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

CollectiveGather = tf_export("raw_ops.CollectiveGather")(_ops.to_raw_op(collective_gather))


def collective_gather_eager_fallback(input, group_size, group_key, instance_key, shape, communication_hint, name, ctx):
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  shape = _execute.make_shape(shape, "shape")
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _attr_T, (input,) = _execute.args_to_matching_eager([input], ctx)
  _inputs_flat = [input]
  _attrs = ("T", _attr_T, "group_size", group_size, "group_key", group_key,
  "instance_key", instance_key, "shape", shape, "communication_hint",
  communication_hint)
  _result = _execute.execute(b"CollectiveGather", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "CollectiveGather", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result


def collective_reduce(input, group_size, group_key, instance_key, merge_op, final_op, subdiv_offsets, wait_for=[], communication_hint="auto", name=None):
  r"""Mutually reduces multiple tensors of identical type and shape.

  Args:
    input: A `Tensor`. Must be one of the following types: `float32`, `half`, `float64`, `int32`, `int64`.
    group_size: An `int`.
    group_key: An `int`.
    instance_key: An `int`.
    merge_op: A `string` from: `"Min", "Max", "Mul", "Add"`.
    final_op: A `string` from: `"Id", "Div"`.
    subdiv_offsets: A list of `ints`.
    wait_for: An optional list of `ints`. Defaults to `[]`.
    communication_hint: An optional `string`. Defaults to `"auto"`.
    name: A name for the operation (optional).

  Returns:
    A `Tensor`. Has the same type as `input`.
  """
  _ctx = _context._context or _context.context()
  tld = _ctx._thread_local_data
  if tld.is_eager:
    try:
      _result = _pywrap_tensorflow.TFE_Py_FastPathExecute(
        _ctx._context_handle, tld.device_name, "CollectiveReduce", name,
        tld.op_callbacks, input, "group_size", group_size, "group_key",
        group_key, "instance_key", instance_key, "merge_op", merge_op,
        "final_op", final_op, "subdiv_offsets", subdiv_offsets, "wait_for",
        wait_for, "communication_hint", communication_hint)
      return _result
    except _core._FallbackException:
      try:
        return collective_reduce_eager_fallback(
            input, group_size=group_size, group_key=group_key,
            instance_key=instance_key, merge_op=merge_op, final_op=final_op,
            subdiv_offsets=subdiv_offsets, wait_for=wait_for,
            communication_hint=communication_hint, name=name, ctx=_ctx)
      except _core._SymbolicException:
        pass  # Add nodes to the TensorFlow graph.
    except _core._NotOkStatusException as e:
      _ops.raise_from_not_ok_status(e, name)
  # Add nodes to the TensorFlow graph.
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  merge_op = _execute.make_str(merge_op, "merge_op")
  final_op = _execute.make_str(final_op, "final_op")
  if not isinstance(subdiv_offsets, (list, tuple)):
    raise TypeError(
        "Expected list for 'subdiv_offsets' argument to "
        "'collective_reduce' Op, not %r." % subdiv_offsets)
  subdiv_offsets = [_execute.make_int(_i, "subdiv_offsets") for _i in subdiv_offsets]
  if wait_for is None:
    wait_for = []
  if not isinstance(wait_for, (list, tuple)):
    raise TypeError(
        "Expected list for 'wait_for' argument to "
        "'collective_reduce' Op, not %r." % wait_for)
  wait_for = [_execute.make_int(_i, "wait_for") for _i in wait_for]
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _, _, _op, _outputs = _op_def_library._apply_op_helper(
        "CollectiveReduce", input=input, group_size=group_size,
                            group_key=group_key, instance_key=instance_key,
                            merge_op=merge_op, final_op=final_op,
                            subdiv_offsets=subdiv_offsets, wait_for=wait_for,
                            communication_hint=communication_hint, name=name)
  _result = _outputs[:]
  if _execute.must_record_gradient():
    _attrs = ("T", _op._get_attr_type("T"), "group_size",
              _op._get_attr_int("group_size"), "group_key",
              _op._get_attr_int("group_key"), "instance_key",
              _op._get_attr_int("instance_key"), "merge_op",
              _op.get_attr("merge_op"), "final_op", _op.get_attr("final_op"),
              "subdiv_offsets", _op.get_attr("subdiv_offsets"), "wait_for",
              _op.get_attr("wait_for"), "communication_hint",
              _op.get_attr("communication_hint"))
    _inputs_flat = _op.inputs
    _execute.record_gradient(
        "CollectiveReduce", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

CollectiveReduce = tf_export("raw_ops.CollectiveReduce")(_ops.to_raw_op(collective_reduce))


def collective_reduce_eager_fallback(input, group_size, group_key, instance_key, merge_op, final_op, subdiv_offsets, wait_for, communication_hint, name, ctx):
  group_size = _execute.make_int(group_size, "group_size")
  group_key = _execute.make_int(group_key, "group_key")
  instance_key = _execute.make_int(instance_key, "instance_key")
  merge_op = _execute.make_str(merge_op, "merge_op")
  final_op = _execute.make_str(final_op, "final_op")
  if not isinstance(subdiv_offsets, (list, tuple)):
    raise TypeError(
        "Expected list for 'subdiv_offsets' argument to "
        "'collective_reduce' Op, not %r." % subdiv_offsets)
  subdiv_offsets = [_execute.make_int(_i, "subdiv_offsets") for _i in subdiv_offsets]
  if wait_for is None:
    wait_for = []
  if not isinstance(wait_for, (list, tuple)):
    raise TypeError(
        "Expected list for 'wait_for' argument to "
        "'collective_reduce' Op, not %r." % wait_for)
  wait_for = [_execute.make_int(_i, "wait_for") for _i in wait_for]
  if communication_hint is None:
    communication_hint = "auto"
  communication_hint = _execute.make_str(communication_hint, "communication_hint")
  _attr_T, (input,) = _execute.args_to_matching_eager([input], ctx)
  _inputs_flat = [input]
  _attrs = ("T", _attr_T, "group_size", group_size, "group_key", group_key,
  "instance_key", instance_key, "merge_op", merge_op, "final_op", final_op,
  "subdiv_offsets", subdiv_offsets, "wait_for", wait_for,
  "communication_hint", communication_hint)
  _result = _execute.execute(b"CollectiveReduce", 1, inputs=_inputs_flat,
                             attrs=_attrs, ctx=ctx, name=name)
  if _execute.must_record_gradient():
    _execute.record_gradient(
        "CollectiveReduce", _inputs_flat, _attrs, _result)
  _result, = _result
  return _result

