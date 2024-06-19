package com.prestamos.SoftwarePrestamos.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CuotaDto {

    private Long id;

    private int numeroCuota;

    private String montoPago;

    private LocalDate fechaPago;

    private String estadoCuota;

    private long prestamoId;
}
