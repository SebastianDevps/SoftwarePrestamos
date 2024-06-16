package com.prestamos.SoftwarePrestamos.Services;

import com.prestamos.SoftwarePrestamos.Entity.Cuota;
import com.prestamos.SoftwarePrestamos.Entity.EstadoCuota;
import com.prestamos.SoftwarePrestamos.Entity.Prestamo;
import com.prestamos.SoftwarePrestamos.Repository.CuotaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CuotaService {

    @Autowired
    private CuotaRepository cuotaRepository;

    public void calcularYGuardarCuotas(Prestamo prestamo) {
        List<Cuota> cuotas = generarCuotasDesdePrestamo(prestamo);
        cuotaRepository.saveAll(cuotas);
    }

    private List<Cuota> generarCuotasDesdePrestamo(Prestamo prestamo) {
        List<Cuota> cuotas = new ArrayList<>();
        LocalDate fechaInicio = prestamo.getFechaCreacion().toLocalDate().plusDays(1);
        LocalDate fechaLimite = LocalDate.parse(prestamo.getFechaLimite(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        int totalCuotas = calcularTotalCuotas(prestamo); // Calcular el total de cuotas

        switch (prestamo.getTipoPago()) {
            case "diario":
                generarCuotasPeriodicas(cuotas, fechaInicio, fechaLimite, ChronoUnit.DAYS, 1, totalCuotas, prestamo);
                break;
            case "quincenal":
                generarCuotasPeriodicas(cuotas, fechaInicio, fechaLimite, ChronoUnit.DAYS, 15, totalCuotas, prestamo);
                break;
            case "mensual":
                generarCuotasPeriodicas(cuotas, fechaInicio, fechaLimite, ChronoUnit.MONTHS, 1, totalCuotas, prestamo);
                break;
            default:
                throw new IllegalArgumentException("Tipo de pago no válido: " + prestamo.getTipoPago());
        }

        return cuotas;
    }

    private int calcularTotalCuotas(Prestamo prestamo) {
        LocalDate fechaInicio = prestamo.getFechaCreacion().toLocalDate().plusDays(1);
        LocalDate fechaLimite = LocalDate.parse(prestamo.getFechaLimite(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        switch (prestamo.getTipoPago()) {
            case "diario":
                return (int) ChronoUnit.DAYS.between(fechaInicio, fechaLimite) + 1;
            case "quincenal":
                return (int) ChronoUnit.DAYS.between(fechaInicio, fechaLimite) / 15 + 1;
            case "mensual":
                return (int) ChronoUnit.MONTHS.between(fechaInicio, fechaLimite) + 1;
            default:
                throw new IllegalArgumentException("Tipo de pago no válido: " + prestamo.getTipoPago());
        }
    }

    private void generarCuotasPeriodicas(List<Cuota> cuotas, LocalDate fechaInicio, LocalDate fechaLimite,
                                         ChronoUnit unit, int amount, int totalCuotas, Prestamo prestamo) {
        LocalDate fechaActual = fechaInicio;
        int numCuota = 1;
        while (fechaActual.isBefore(fechaLimite) || fechaActual.isEqual(fechaLimite)) {
            Cuota cuota = new Cuota();
            cuota.setNumCuota(numCuota++);
            cuota.setFechaPago(fechaActual);
            cuota.setMontoPago(calcularMontoCuota(prestamo, totalCuotas)); // Calcular monto con totalCuotas
            cuota.setEstadoCuota(EstadoCuota.PENDIENTE);
            cuota.setPrestamo(prestamo);
            cuotas.add(cuota);
            fechaActual = fechaActual.plus(amount, unit);
        }
    }

    private String calcularMontoCuota(Prestamo prestamo, int totalCuotas) {
        float montoAPagar = prestamo.getMontoAPagar();
        return String.valueOf(montoAPagar / totalCuotas);
    }
}
