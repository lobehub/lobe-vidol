import { INITIAL_COORDINATES, INITIAL_Z_INDEX } from '@/constants/common';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Coordinates } from '@dnd-kit/utilities';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Container from './Container';

interface ControlPanelProps {
  className?: string;
  coordinates?: Coordinates;
  onBlur?: React.FocusEventHandler;
  onClose: () => void;
  onCoordinatesChange?: (coordinates: Coordinates) => void;
  onFocus?: React.FocusEventHandler;
  style?: React.CSSProperties;
  title?: string;
  zIndex?: number;
}

const Panel = (props: PropsWithChildren<ControlPanelProps>) => {
  const {
    style,
    className,
    children,
    onClose,
    title,
    onCoordinatesChange,
    onBlur,
    onFocus,
    zIndex = INITIAL_Z_INDEX,
    coordinates = INITIAL_COORDINATES,
  } = props;
  const [{ x, y }, setCoordinates] = useState<Coordinates>(coordinates);

  useEffect(() => {
    if (coordinates.x !== x || coordinates.y !== y) setCoordinates(coordinates);
  }, [coordinates.x, coordinates.y]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {});

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          const newCoordinates = {
            x: x + delta.x,
            y: y + delta.y,
          };
          onCoordinatesChange?.(newCoordinates);
          return newCoordinates;
        });
      }}
      sensors={sensors}
    >
      <Container
        className={className}
        onBlur={onBlur}
        onClose={onClose}
        onFocus={onFocus}
        style={style}
        title={title}
        x={x}
        y={y}
        zIndex={zIndex}
      >
        {children}
      </Container>
    </DndContext>
  );
};

export default Panel;
